from django.db import models
import random

from common.models import CommonId


class Test(CommonId):

    question = models.CharField(max_length=200, verbose_name='вопрос')
    options = models.CharField(max_length=200, verbose_name='варианты ответа')
    answer = models.CharField(max_length=200, verbose_name='ответ')

    def get_options(self):
        options = self.options.split(', ')
        options.append(self.answer)
        random.shuffle(options)
        return options

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = 'тест'
        verbose_name_plural = '04 | Тесты'
