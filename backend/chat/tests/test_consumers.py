from asgiref.sync import sync_to_async, async_to_sync
from channels.db import database_sync_to_async
from channels.testing.websocket import WebsocketCommunicator
import pytest
from typing import Dict

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.test import Client, AsyncClient

from common.utils import date_now
from conftest import ParameterStorage
from backend.routing import application
from account.models import Student, Teacher
from ..models import Chat


pytestmark = pytest.mark.django_db


@pytest.fixture
def async_client():
    return AsyncClient


@pytest.fixture
def async_create_user():
    @database_sync_to_async
    def _async_create_user(user_data: Dict, is_staff: bool = False) -> User:
        user = get_user_model().objects.create_user(
            username=user_data.get('username'),
            email=user_data.get('email'),
            first_name=user_data.get('first_name'),
            last_name=user_data.get('last_name'),
            password=make_password(user_data.get('password')),
            is_staff=is_staff,
        )
        return user
    return _async_create_user


@pytest.fixture(autouse=True)
def async_create_student(async_create_user):
    @database_sync_to_async
    def _async_create_student() -> Student:
        user = async_to_sync(async_create_user)(ParameterStorage.student_auth)
        student = Student.objects.create(user=user)
        return student
    return _async_create_student


@pytest.fixture(autouse=True)
def async_create_teacher(async_create_user):
    @database_sync_to_async
    def _async_create_teacher() -> Teacher:
        user = async_to_sync(async_create_user)(ParameterStorage.teacher_auth, is_staff=True)
        teacher = Teacher.objects.create(user=user)
        return teacher
    return _async_create_teacher


@pytest.fixture
async def async_student_client_register(async_create_student, async_client):
    student = await async_create_student()
    client = async_client()
    await sync_to_async(client.force_login)(user=student.user)

    return client


@pytest.fixture
async def async_teacher_client_register(async_create_teacher, async_client):
    teacher = await async_create_teacher()
    client = async_client()
    await sync_to_async(client.force_login)(user=teacher.user)

    return client


@pytest.fixture(autouse=True)
async def websocket_communicator():
    async def _websocket_communicator(async_client_register):
        communicator = WebsocketCommunicator(
            application=application,
            path='ws/lk/chat/',
            headers=[(
                b'cookie',
                f'{settings.SESSION_COOKIE_NAME}={async_client_register.cookies[settings.SESSION_COOKIE_NAME].value}'.encode('ascii')
            )],
        )
        return communicator
    return _websocket_communicator


@pytest.fixture(autouse=True)
async def ws_connect(websocket_communicator):
    async def _ws_connect(async_client_register):
        communicator = await websocket_communicator(async_client_register)
        connected, _ = await communicator.connect()
        assert connected

        return communicator
    return _ws_connect


@pytest.fixture
def create_chat():
    return sync_to_async(Chat.objects.create)(
        interlocutor_one=get_user_model().objects.get(email=ParameterStorage.student_auth.get('email')),
        interlocutor_two=get_user_model().objects.get(email=ParameterStorage.teacher_auth.get('email')),
    )


@pytest.mark.asyncio
class TestChat:

    async def test_connect(self, ws_connect, async_student_client_register, async_teacher_client_register, create_chat):

        chat = await create_chat

        student_communicator = await ws_connect(async_student_client_register)
        teacher_communicator = await ws_connect(async_teacher_client_register)

        await student_communicator.send_json_to({
            'event': 'get.interlocutors',
            'data': {},
        })
        message = await student_communicator.receive_json_from()

        assert message['status'] == 'ok'
        assert message['event'] == 'get.interlocutors'
        data = list(filter(lambda item: item['chat_id'] == str(chat.pk), message['data']))[0]
        assert data['interlocutor_id'] == str(chat.interlocutor_two.pk)

        await student_communicator.send_json_to({
            'event': 'get.messages',
            'data': {'currentChatId': str(chat.pk)},
        })
        message = await student_communicator.receive_json_from()

        assert message['status'] == 'ok'
        assert message['event'] == 'get.messages'
        data = message['data']
        assert data['chat_id'] == str(chat.pk)
        assert data['messages'] == []

        await student_communicator.send_json_to({
            'event': 'set.message',
            'data': {
                'text': 'Hello, teacher',
                'chat_id': str(chat.pk),
                'sender_id': str(chat.interlocutor_one.pk),
            },
        })
        message = await student_communicator.receive_json_from()

        assert message['status'] == 'ok'
        assert message['event'] == 'set.message'
        data = message['data']
        assert data['message_id']
        assert data['text'] == 'Hello, teacher'
        assert data['sent_at']
        assert data['sender_id'] == str(chat.interlocutor_one.pk)

        message = await teacher_communicator.receive_json_from()

        assert message['status'] == 'ok'
        assert message['event'] == 'set.message'
        data = message['data']
        assert data['message_id']
        assert data['text'] == 'Hello, teacher'
        assert data['sent_at']
        assert data['sender_id'] == str(chat.interlocutor_one.pk)

        await student_communicator.disconnect()
        await teacher_communicator.disconnect()
