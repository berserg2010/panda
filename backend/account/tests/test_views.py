import pytest
from mixer.backend.django import mixer
from rest_framework import status
from django.contrib.auth import get_user_model

from account.models import RequestUser


pytestmark = pytest.mark.django_db


def test_request_user(client):

    data = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
    }
    response = client.post('/request_user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "error", "message": "Некоректные данные"}
    assert RequestUser.objects.count() == 0

    data = {
        'first_name': 'Vasia',
        'last_name': 'Vasiliev',
        'email': 'vasia@yandex.ru',
        'phone': '7896543210',
    }

    response = client.post('/request_user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "success", "message": "Вы оставили заявку!"}
    assert RequestUser.objects.count() == 1

    req_user = RequestUser.objects.get(email=data.get('email'))
    assert req_user.first_name == data.get('first_name')
    assert req_user.last_name == data.get('last_name')
    assert req_user.email == data.get('email')
    assert req_user.phone == data.get('phone')

    mixer.blend(
        get_user_model(),
        email='vasia@yandex.ru',
    )

    response = client.post('/request_user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "error", "message": "Вы уже зарегистрированы!"}
    assert RequestUser.objects.count() == 1


# def test_register_user(client, create_superuser):
#
#     create_superuser()
#     data = {
#         'first_name': 'Vasia',
#         'last_name': 'Pupkin',
#         'email': 'vasia@yandex.ru',
#         'phone': '7896543210',
#         'username': 'vasia',
#         'password1': 'asdf;lkjasdf;lkj',
#     }
#
#     response = client.post('/register/', data=data)
#     assert response.status_code == status.HTTP_200_OK
#     assert response.content == b'{"message": "ok"}'
#     assert get_user_model().objects.count() == 2
#
#     user = get_user_model().objects.get()
#     assert user.first_name == data.get('first_name')
#     assert user.last_name == data.get('last_name')
#     assert user.email == data.get('email')
#     assert user.username == data.get('username')
#     assert user.check_password(data.get('password1'))
#
#     response = client.post('/register/', data=data)
#     assert response.status_code == status.HTTP_200_OK
#     assert response.content == b'{"message": "error"}'
#     assert get_user_model().objects.count() == 2
