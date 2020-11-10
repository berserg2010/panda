import pytest
from rest_framework import status
from django.contrib.auth import get_user_model

from private_side.urls import urlpatterns
from account.models import RequestUser


pytestmark = pytest.mark.django_db


@pytest.mark.parametrize('url', urlpatterns)
@pytest.mark.parametrize('client_fixture, errors', [
    ('client', status.HTTP_302_FOUND),
    ('client_register', status.HTTP_200_OK),
])
def test_get_private_side(url, client_fixture, errors, request):

    client = request.getfixturevalue(client_fixture)

    response = client.get(f'/lk/{url.pattern}')
    assert response.status_code == errors


def test_request_user(client):

    data = {
        'name': 'Vasia',
        'email': 'vasia@yandex.ru',
        'phone': '7896543210',
    }

    response = client.post('/request_user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.content == b'{"message": "ok"}'
    assert RequestUser.objects.count() == 1

    req_user = RequestUser.objects.get(email=data.get('email'))
    assert req_user.name == data.get('name')
    assert req_user.email == data.get('email')
    assert req_user.phone == data.get('phone')

    response = client.post('/request_user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.content == b'{"message": "ok"}'
    assert RequestUser.objects.count() == 2


@pytest.mark.skip
def test_register_user(client, create_superuser):

    create_superuser()
    data = {
        'first_name': 'Vasia',
        'last_name': 'Pupkin',
        'email': 'vasia@yandex.ru',
        'phone': '7896543210',
        'username': 'vasia',
        'password1': 'asdf;lkjasdf;lkj',
    }

    response = client.post('/register/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.content == b'{"message": "ok"}'
    assert get_user_model().objects.count() == 2

    user = get_user_model().objects.get(username=data.get('username'))
    assert user.first_name == data.get('first_name')
    assert user.last_name == data.get('last_name')
    assert user.email == data.get('email')
    assert user.username == data.get('username')
    assert user.check_password(data.get('password1'))

    response = client.post('/register/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.content == b'{"message": "error"}'
    assert get_user_model().objects.count() == 2
