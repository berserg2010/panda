from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from mixer.backend.django import mixer
import pytest

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.test import Client

from account.models import Student, Payment

pytestmark = pytest.mark.django_db


@pytest.fixture
def create_user_handler():
    def _create_user(user_data):
        return mixer.blend(
            get_user_model(),
            username=user_data.get('username'),
            email=user_data.get('email'),
            first_name=user_data.get('first_name'),
            last_name=user_data.get('last_name'),
            password=make_password(user_data.get('password')),
        )
    return _create_user


@pytest.fixture(autouse=True)
def create_superuser(create_user_handler):
    def _create_superuser():
        return create_user_handler(ParameterStorage.root_auth)
    return _create_superuser


@pytest.fixture(autouse=True)
def create_student(create_user_handler):
    def _create_student() -> User:
        user = create_user_handler(ParameterStorage.student_auth)
        mixer.blend(
            Student,
            user=user,
            # payment=mixer.blend(Payment),
        )
        return user
    return _create_student


@pytest.fixture
def client():
    return Client()


@pytest.fixture
def client_register(client, create_superuser):
    create_superuser()
    res = client.login(
        username=ParameterStorage.root_auth.get('username'),
        password=ParameterStorage.root_auth.get('password'),
    )
    assert res
    return client


@pytest.fixture
def student_register(client, create_student):
    create_student()
    res = client.login(
        username=ParameterStorage.student_auth.get('username'),
        password=ParameterStorage.student_auth.get('password'),
    )
    assert res
    return client


class ParameterStorage:

    root_auth = {
        'username': 'root',
        'email': 'root@asdfasdf.com',
        'first_name': 'first_root',
        'last_name': 'last_root',
        'password': get_user_model().objects.make_random_password(),
    }

    student_auth = {
        'username': 'user',
        'email': 'student@asdfasdf.com',
        'first_name': 'first_name_student',
        'last_name': 'last_name_student',
        'password': get_user_model().objects.make_random_password(),
    }
