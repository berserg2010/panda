from django.db import models


class SettingsSite(models.Model):

    title = models.CharField(max_length=20, blank=True, verbose_name='название')
    phone_first = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон 1')
    phone_second = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон 2')

    office_email = models.EmailField(blank=True, verbose_name='почта учебной части')
    support_email = models.EmailField(blank=True, verbose_name='почта технической поддержки')

    address = models.CharField(max_length=500, null=True, blank=True, verbose_name='адрес организации')

    is_active = models.BooleanField(default=True, verbose_name='активный')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'настройки сайта'
        verbose_name_plural = 'настройки сайта'


class SocialNetwork(models.Model):

    name = models.CharField(primary_key=True, max_length=20, verbose_name='название соц. сети')

    link = models.URLField(blank=True, verbose_name='ссылка')

    class Meta:
        verbose_name = 'социальная сеть'
        verbose_name_plural = 'социальные сети'
