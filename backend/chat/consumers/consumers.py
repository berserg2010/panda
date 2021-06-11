from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from datetime import datetime
from pydantic import BaseModel
from typing import Union, Optional, Dict
from uuid import UUID

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.db.models import Q, QuerySet

from account.services.request_user import get_account
from account.models import Teacher, Student
from paid_course.consumers.common import CommonConsumer
from ..models import Chat, Message


class InterlocutorConsumer(CommonConsumer):
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.group_id: Optional[str] = None


    async def connect(self):
        await super().connect()
        self.user = self.scope['user']
        self.group_id: Optional[str] = None

        chats_id = await self.get_chats_id()

        for chat_id in chats_id:
            await self.channel_layer.group_add(
                str(chat_id),
                self.channel_name,
            )


    async def disconnect(self, close_code):
        await super().disconnect(code=close_code)


    async def event_get_interlocutors(self, event):
        interlocutors = await self.get_interlocutors()
        await self._send_message(interlocutors, event=event['event'])


    async def event_get_messages(self, event):
        chat_id = event.get('data')['currentChatId']
        messages = await self.get_messages(chat_id)
        await self._send_message(messages, event=event['event'])


    async def event_set_message(self, event):
        data = event.get('data')
        self.group_id = data.get('chat_id')
        message = await self.set_message(data)
        data = MessageModel(
            message_id=str(message.pk),
            text=message.text,
            sent_at=str(message.sent_at),
            sender_id=str(message.sender.pk),
        ).dict()
        await self._group_send(data, event=event['event'])


    @database_sync_to_async
    def get_chats_id(self):
        chats = self.get_chats()
        return list(chats.values_list('pk', flat=True))


    @database_sync_to_async
    def get_interlocutors(self):

        chats = self.get_chats()

        interlocutors = []
        for chat in chats:
            interlocutor = chat.interlocutor_one if chat.interlocutor_two.pk == self.user.pk else chat.interlocutor_two
            last_message = None
            if chat.last_message:
                last_message = MessageModel(
                    message_id=str(chat.last_message.pk),
                    text=chat.last_message.text,
                    sent_at=str(chat.last_message.sent_at),
                    # chat_id=str(chat.last_message.chat.pk),
                    sender_id=chat.last_message.sender.pk,
                )
            interlocutors.append(InterlocutorModel(
                interlocutor_id=interlocutor.pk,
                full_name=interlocutor.get_full_name(),
                chat_id=str(chat.pk),
                last_message=last_message,
            ).dict())

        return interlocutors


    @database_sync_to_async
    def get_messages(self, chat_id):

        qs = Message.objects.filter(chat=chat_id)

        messages = []
        for message in qs:
            messages.append(MessageModel(
                message_id=str(message.pk),
                text=message.text,
                sent_at=str(message.sent_at),
                sender_id=str(message.sender.pk),
            ).dict())

        return {
            'chat_id': chat_id,
            'messages': messages,
        }


    @database_sync_to_async
    def set_message(self, data: Dict) -> Message:
        new_message = Message.objects.create(
            text=data.get('text'),
            sent_at=data.get('sent_at'),
            chat=Chat.objects.get(pk=data.get('chat_id')),
            sender=get_user_model().objects.get(pk=data.get('sender_id')),
        )
        return new_message


    def get_chats(self):
        chats = Chat.objects.filter(
            Q(interlocutor_one=self.user) | Q(interlocutor_two=self.user)
        ).select_related('interlocutor_one', 'interlocutor_two')
        return chats

    # async def chat_message(self, event):
    #     message = event['message']
    #
    #     # Send message to WebSocket
    #     await self.send(text_data=json.dumps({
    #         'message': message
    #     }))


class MessageModel(BaseModel):
    message_id: str
    text: str = ''
    sent_at: str
    # chat_id: str
    sender_id: int


class InterlocutorModel(BaseModel):
    interlocutor_id: int
    full_name: str
    chat_id: str
    last_message: MessageModel = None
