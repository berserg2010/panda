from django.db import models


class Word(models.Model):

    spelling = models.CharField(max_length=200, verbose_name='написание')
    transcription = models.CharField(max_length=200, verbose_name='произношение')
    translation = models.CharField(max_length=200, verbose_name='перевод')
    description = models.CharField(max_length=200, verbose_name='описание')

    example = models.ManyToManyField('Example', blank=True, verbose_name='пример со словом')


    def __str__(self):
        return f'{self.spelling.capitalize()} | {self.translation.capitalize()}'


    class Meta:

        verbose_name = 'слово'
        verbose_name_plural = 'слова'


class Example(models.Model):

    example = models.CharField(max_length=200, verbose_name='пример')
    description = models.CharField(max_length=200, blank=True, verbose_name='описание')


    def __str__(self):
        return f'{self.example}'


    class Meta:

        verbose_name = 'пример со словом'
        verbose_name_plural = 'примеры со словом'
