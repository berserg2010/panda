from django.db import models

from common.models import CommonFields
from .test import Test
from .word import Word


class Lesson(CommonFields):

    homework = models.ForeignKey('Homework', null=True, blank=True, on_delete=models.PROTECT)

    # video_practice
    # book
    # article


    def __str__(self):
        return self.title


    class Meta:

        verbose_name = 'урок'
        verbose_name_plural = '01 | Уроки'


class Homework(models.Model):

    test = models.ManyToManyField(Test)
    word = models.ManyToManyField(Word)

    # game

    class Meta:

        verbose_name = 'домашнее задание'
        verbose_name_plural = '02 | Домашние задания'
