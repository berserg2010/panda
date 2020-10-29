from django.db import models

from common.models import CommonId


class Word(CommonId):

    spelling = models.CharField(max_length=200, verbose_name='написание')
    transcription = models.CharField(max_length=200, blank=True, verbose_name='произношение')
    translation = models.CharField(max_length=200, verbose_name='перевод')
    description = models.CharField(max_length=200, blank=True, verbose_name='описание')

    example = models.ManyToManyField('Example', blank=True, verbose_name='пример со словом')


    def __str__(self):
        return f'{self.spelling.capitalize()} | {self.translation.capitalize()}'

    class Meta:
        verbose_name = 'слово'
        verbose_name_plural = '02 | Слова'


class Example(CommonId):

    example = models.CharField(max_length=200, verbose_name='пример')
    description = models.CharField(max_length=200, blank=True, verbose_name='описание')


    def __str__(self):
        return f'{self.example}'


    class Meta:

        verbose_name = 'пример со словом'
        verbose_name_plural = '03 | Примеры со словом'
