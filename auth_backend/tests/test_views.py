import pytest
from mixer.backend.django import mixer
from rest_framework import status
from django.contrib.auth import get_user_model

from private_side.urls import urlpatterns


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


def test_register_user(client, create_superuser):
    create_superuser()
    data = {
        'first_name': 'Vasia',
        'last_name': 'Pupkin',
        'email': 'vasia@yandex.ru',
        'tel': '7896543210',
        'username': 'vasia',
        'password': 'asdf;lkjasdf;lkj',
    }

    response = client.post('/register/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert get_user_model().objects.count() == 2

    user = get_user_model().objects.get(username=data.get('username'))

    assert user.first_name == data.get('first_name')
    assert user.last_name == data.get('last_name')
    assert user.email == data.get('email')
    assert user.username == data.get('username')
    assert user.check_password(data.get('password'))
