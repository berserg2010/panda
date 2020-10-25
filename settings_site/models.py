from django.db import models


class SettingsSite(models.Model):

    phone_first = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон')
    phone_second = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон')

    office_email = models.EmailField(blank=True, verbose_name='почта учебной части')
    support_email = models.EmailField(blank=True, verbose_name='почта технической поддержки')

    address = models.CharField(max_length=500, null=True, blank=True, verbose_name='адрес организации')

    is_active = models.BooleanField(default=True, verbose_name='активный')


    class Meta:
        verbose_name = 'настройки сайта'
        verbose_name_plural = 'настройки сайта'


class SocialNetwork(models.Model):

    name = models.CharField(max_length=20, verbose_name='название соц. сети')

    link = models.URLField(blank=True, verbose_name='ссылка')


    class Meta:
        verbose_name = 'социальная сеть'
        verbose_name_plural = 'социальные сети'
