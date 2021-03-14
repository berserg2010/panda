from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json
from typing import Set, Union

from django.core.cache import cache

from account.services.request_user import get_account
from account.models import Teacher, Student
from .common import CommonConsumer


class StatusInLesson(CommonConsumer):

    async def connect(self):
        await super().connect()
        self.user = self.scope['user']
        self.group_id: str = self.scope['url_route']['kwargs']['group_id']
        self.group = None
        self.participant: Union[Teacher, Student] = await self.get_participant()
        self.participants: Set = await self.get_participants()

        if not self.group_id:
            await self._throw_error({'detail': 'Урок не найден'})
            await self.close()
            return

        await self.channel_layer.group_add(
            self.group_id,
            self.channel_name
        )

        await self.set_participant()

        # print(self.participants)

        data = {
            'participant': str(self.participant.pk),
            'participants': list(self.participants)
        }
        return await self._group_send(data, event='connect')


    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.group_id,
            self.channel_name
        )

        await self.del_participant()

        # print(self.participants)

        data = {
            'participant': str(self.participant.pk),
            'participants': list(self.participants)
        }
        return await self._group_send(data, event='disconnect')


    async def event_status_connect(self, event):
        data = event['data']
        return await self._group_send(data, event=event['event'])

    @database_sync_to_async
    def get_participant(self):
        participant = get_account(self.user)
        return participant

    @database_sync_to_async
    def get_participants(self):
        participants = cache.get_or_set(self.group_id, [])
        return set(participants)

    @database_sync_to_async
    def set_participant(self):
        self.participants.add(str(self.participant.pk))
        cache.set(self.group_id, list(self.participants), timeout=43200)

    @database_sync_to_async
    def del_participant(self):
        self.participants.discard(str(self.participant.pk))
        if len(self.participants):
            cache.set(self.group_id, list(self.participants), timeout=43200)
        else:
            cache.delete(self.group_id)


# class ChatConsumer(AsyncJsonWebsocketConsumer):
#
#     async def connect(self):
#         # self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_name = 1
#         self.room_group_name = 'chat_%s' % self.room_name
#
#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#
#         await self.accept()
#
#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )
#
#     async def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']
#
#         # Send message to room group
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message
#             }
#         )
#
#     async def chat_message(self, event):
#         message = event['message']
#
#         # Send message to WebSocket
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))
