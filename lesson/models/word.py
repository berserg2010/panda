from django.db import models


class Word(models.Model):

    spelling = models.CharField(max_length=200, verbose_name='написание')
    transcription = models.CharField(max_length=200, verbose_name='произношение')
    translation = models.CharField(max_length=200, verbose_name='перевод')
    description = models.CharField(max_length=200, verbose_name='описание')

    class Meta:

        verbose_name = 'слово'
        verbose_name_plural = 'слова'


class WordExample(models.Model):

    example = models.CharField(max_length=200, verbose_name='пример')
    description = models.CharField(max_length=200, verbose_name='описание')

    word = models.ForeignKey(Word, on_delete=models.PROTECT)

    class Meta:

        verbose_name = 'пример со словом'
        verbose_name_plural = 'примеры со словом'
