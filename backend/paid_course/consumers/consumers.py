from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json
import uuid

from account.services.request_user import get_account
from .common import CommonConsumer


class StatusInLesson(CommonConsumer):

    async def connect(self):
        await super().connect()
        self.user = self.scope['user']
        self.group_id: uuid = self.scope['url_route']['kwargs']['group_id']
        self.group = None
        self.participants = await self.get_participant()

        if not self.group_id:
            await self._throw_error({'detail': 'Урок не найден'})
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.group_id,
            self.channel_name
        )
        print(dir(self.channel_layer))

        data = {
            'participants': str(self.participants.pk)
        }

        return await self._group_send(data, event='connect')

        await self.accept()

    async def disconnect(self, close_code):
        data = {
            'participants': str(self.participants.pk)
        }
        return await self._group_send(data, event='disconnect')

        # await self.channel_layer.group_discard(
        #     self.lesson_id,
        #     self.channel_name
        # )

    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #
    #     # Send message to room group
    #     await self.channel_layer.group_send(
    #         self.channel_name,
    #         {
    #             'type': 'status_connect',
    #             'message': message
    #         }
    #     )

    async def event_status_connect(self, event):
        data = event['data']
        return await self._group_send(data, event=event['event'])

    @database_sync_to_async
    def get_participant(self):
        return get_account(self.user)


class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        # self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = 1
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
