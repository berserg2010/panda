import pytest
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

from django.contrib.auth import get_user_model

pytestmark = pytest.mark.django_db


@database_sync_to_async
def create_user(username, email, password):
    user = get_user_model().objects.create_user(
        username=username,
        email=email,
        password=password
    )
    return user


@pytest.mark.asyncio
async def test_chat():
    user1 = await create_user('test1', 'test1@gmail.com', '123qweasd')
    assert user1
