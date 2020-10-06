from django.db import models


class Test(models.Model):

    question = models.CharField(max_length=200, verbose_name='вопрос')
    options = models.CharField(max_length=200, verbose_name='варианты ответа')
    answer = models.CharField(max_length=200, verbose_name='ответ')

    class Meta:

        verbose_name = 'тест'
        verbose_name_plural = 'тесты'
