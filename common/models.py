from django.db import models


class CommonFields(models.Model):

    title = models.CharField(max_length=50, verbose_name='заголовок')
    description = models.CharField(max_length=500, verbose_name='описание')

    class Meta:

        abstract = True
