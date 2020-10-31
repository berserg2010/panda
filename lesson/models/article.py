from django.db import models

from common.models import CommonFields


class Article(CommonFields):

    url = models.URLField(blank=True, verbose_name='ссылка на статью')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'статья'
        verbose_name_plural = '06 | Статьи'
