from django.db import models

from common.models import CommonFields
from .test import Test
from .word import Word, Example
from .article import Article
from .book import Book


class Lesson(CommonFields):

    tests = models.ManyToManyField(Test, blank=True, verbose_name='тесты')
    words = models.ManyToManyField(Word, blank=True, verbose_name='слова')
    articles = models.ManyToManyField(Article, blank=True, verbose_name='статьи')
    books = models.ManyToManyField(Book, blank=True, verbose_name='книги')

    # game
    # video_practice
    # book


    def __str__(self):
        return self.title


    class Meta:

        verbose_name = 'урок'
        verbose_name_plural = '01 | Уроки'
