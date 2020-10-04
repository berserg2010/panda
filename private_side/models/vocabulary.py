from django.db import models


class Word(models.Model):

    spelling = models.CharField(max_length=100, verbose_name='Написание')
    transcription = models.CharField(max_length=100, verbose_name='Произношение')
    translation = models.CharField(max_length=100, verbose_name='Перевод')
    description = models.TextField(max_length=500, verbose_name='Описание')

    # audio


class WordExamples(models.Model):

    example = models.TextField(max_length=500, verbose_name='Пример')
    word = models.ForeignKey(Word, on_delete=models.CASCADE)

    # audio