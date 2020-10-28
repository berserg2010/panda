from django.db import models


class SettingsSite(models.Model):

    title = models.CharField(max_length=20, blank=True, verbose_name='название')
    phone_first = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон 1')
    phone_second = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон 2')
    address = models.CharField(max_length=500, null=True, blank=True, verbose_name='адрес организации')

    email_office = models.EmailField(blank=True, verbose_name='почта учебной части')
    email_support = models.EmailField(blank=True, verbose_name='почта технической поддержки')

    facebook = models.URLField(blank=True, verbose_name='facebook')
    instagram = models.URLField(blank=True, verbose_name='instagram')
    twitter = models.URLField(blank=True, verbose_name='twitter')
    youtube = models.URLField(blank=True, verbose_name='youtube')

    is_active = models.BooleanField(default=True, verbose_name='активный')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'настройки сайта'
        verbose_name_plural = 'настройки сайта'
