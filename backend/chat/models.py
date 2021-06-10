from django.contrib.auth import get_user_model
from django.db import models

from common.models import CommonId


class Chat(CommonId):
    interlocutor_one = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, related_name='chat_interlocutor_one', verbose_name='первый собеседник')
    interlocutor_two = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, related_name='chat_interlocutor_two', verbose_name='второй собеседник')

    @property
    def last_message(self):
        return self.message_set.last()

    def __str__(self):
        return f'{self.interlocutor_one} | {self.interlocutor_two}'

    class Meta:
        verbose_name = 'чат'
        verbose_name_plural = 'чаты'
        unique_together = ('interlocutor_one', 'interlocutor_two')


class Message(CommonId):
    text = models.TextField(default='', blank=True, verbose_name='текст сообщения')

    sent_at = models.DateTimeField(auto_now_add=True, verbose_name='дата отправки')

    chat = models.ForeignKey('Chat', on_delete=models.PROTECT, verbose_name='чат')
    sender = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, related_name='message_sender', verbose_name='отправитель')

    def __str__(self):
        return f'{self.sender} | {self.sent_at}'

    class Meta:
        verbose_name = 'сообщение'
        verbose_name_plural = 'сообщения'
        ordering = ('sent_at', )
