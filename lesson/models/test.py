from django.db import models
import random


class Test(models.Model):

    question = models.CharField(max_length=200, verbose_name='вопрос')
    options = models.CharField(max_length=200, verbose_name='варианты ответа')
    answer = models.CharField(max_length=200, verbose_name='ответ')


    def get_options(self):
        options = self.options.split(', ')
        options.append(self.answer)
        random.shuffle(options)
        return options


    def __str__(self):
        return f'{self.question}'


    class Meta:

        verbose_name = 'тест'
        verbose_name_plural = 'тесты'
