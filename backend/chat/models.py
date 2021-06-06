from django.db import models
from django.contrib.auth import get_user_model

from common.models import CommonId


class Message(CommonId):
    text = models.TextField(default='', blank=True, verbose_name='текст сообщения')

    sent_at = sending_date = models.DateTimeField(auto_now_add=True, verbose_name='дата отправки')

    sender = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, verbose_name='отправитель')
    receiver = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, verbose_name='получатель')

    def __str__(self):
        return f'{self.sender} | {self.receiver}'

    class Meta:
        verbose_name = 'сообщение'
        verbose_name_plural = 'сообщения'
