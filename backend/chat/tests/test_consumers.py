import pytest
from channels.db import database_sync_to_async
from channels.testing.websocket import WebsocketCommunicator
from asgiref.sync import sync_to_async

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.test import Client

from conftest import ParameterStorage
from backend.routing import application


pytestmark = pytest.mark.django_db


@database_sync_to_async
def create_user(username, email, password):
    user = get_user_model().objects.create_user(
        username=username,
        email=email,
        password=make_password(password),
    )
    return user


@pytest.mark.asyncio
class TestChat:

    async def test_connect(self):
        client_1 = Client()
        client_2 = Client()

        user_1 = await create_user('test1', 'test1@gmail.com', '123qweasd')
        user_2 = await create_user('test2', 'test2@gmail.com', '123qweasd')

        await sync_to_async(client_1.force_login)(user=user_1)
        await sync_to_async(client_2.force_login)(user=user_2)

        communicator_1 = WebsocketCommunicator(
            application=application,
            path='ws/lk/chat/',
            headers=[(
                b'cookie',
                f'{settings.SESSION_COOKIE_NAME}={client_1.cookies[settings.SESSION_COOKIE_NAME].value}'.encode('ascii')
            )],
        )

        connected, _ = await communicator_1.connect()
        assert connected
