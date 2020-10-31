from django.db import models

from common.models import CommonId, CommonFields
from .test import Test
from .word import Word, Example
from .article import Article
from .book import Book


class Lesson(CommonFields):

    tests = models.ManyToManyField(
        Test,
        blank=True,
        related_name='lessons',
        verbose_name='тесты',
    )
    homework_tests = models.ManyToManyField(
        Test,
        blank=True,
        related_name='homework_lessons',
        verbose_name='тесты (ДЗ)',
    )
    words = models.ManyToManyField(
        Word,
        blank=True,
        related_name='lessons',
        verbose_name='слова',
    )
    homework_words = models.ManyToManyField(
        Word,
        blank=True,
        related_name='homework_lessons',
        verbose_name='слова (ДЗ)',
    )
    articles = models.ManyToManyField(Article, blank=True, verbose_name='статьи')
    books = models.ManyToManyField(Book, blank=True, verbose_name='книги')

    # game
    # video_practice

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'урок'
        verbose_name_plural = '01 | Уроки'
