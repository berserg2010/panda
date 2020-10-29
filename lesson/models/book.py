from django.db import models

from common.models import CommonFields


class Book(CommonFields):

    author = models.CharField(max_length=100, default='', blank=True, verbose_name='автор')
    isbn = models.CharField(max_length=13, default='', blank=True, verbose_name='ISBN')


    def __str__(self):
        return f'{self.title} | {self.author}'


    class Meta:

        verbose_name = 'книга'
        verbose_name_plural = '05 | Книги'
