from django.db import models
from django.contrib.auth import get_user_model
import pytz


GENDER = [
    ('U', 'Undefined'),
    ('M', 'male'),
    ('F', 'female'),
]

TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))


class Account(models.Model):

    gender = models.CharField(choices=GENDER, max_length=1, default='U', verbose_name='пол')
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Teacher(Account):

    native_speaker = models.CharField(max_length=100, verbose_name='родной язык')


class Student(Account):

    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон')
    age = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='возраст')
    native_language = models.CharField(max_length=20, null=True, blank=True, verbose_name='родной язык')
    pronunciation = models.CharField(null=True, blank=True, verbose_name='акцент')
    timezone = models.CharField(max_length=32, choices=TIMEZONES, default='UTC', verbose_name='часовой пояс')
    system_notification = models.BooleanField(default=True, verbose_name='системные уведомления')
    support_message = models.BooleanField(default=False, verbose_name='сообщения от службы поддержки')
