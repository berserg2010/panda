import pytest
from mixer.backend.django import mixer
from django.test import Client
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password


pytestmark = pytest.mark.django_db


@pytest.fixture
def create_user():
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
def create_superuser(create_user):
    def _create_superuser():
        return create_user(ParameterStorage.root_auth)
    return _create_superuser


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


class ParameterStorage:

    root_auth = {
        'username': 'root',
        'email': 'root@asdfasdf.com',
        'first_name': 'first_name',
        'last_name': 'last_name',
        'password': 'lkasdjlkasdflaksdjf',
    }
