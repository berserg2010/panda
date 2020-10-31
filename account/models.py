from django.db import models
from django.contrib.auth import get_user_model
import pytz

from common.models import CommonId


GENDER = [
    ('U', 'Undefined'),
    ('M', 'male'),
    ('F', 'female'),
]

TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))


class Account(CommonId):

    gender = models.CharField(choices=GENDER, max_length=1, default='U', verbose_name='пол')

    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, verbose_name='учётная запись')

    class Meta:
        abstract = True


class Teacher(Account):

    native_speaker = models.CharField(max_length=100, default='', blank=True, verbose_name='родной язык')

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = 'учитель'
        verbose_name_plural = '01 | Учителя'


class Student(Account):

    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон')
    native_language = models.CharField(max_length=20, null=True, blank=True, verbose_name='родной язык')
    pronunciation = models.CharField(max_length=20, null=True, blank=True, verbose_name='акцент')
    timezone = models.CharField(max_length=32, choices=TIMEZONES, default='UTC', verbose_name='часовой пояс')
    voice_acting = models.CharField(choices=GENDER[1:], max_length=1, default='M', verbose_name='голос озвучки')
    accent_of_voice_acting = models.CharField(max_length=20, null=True, blank=True, verbose_name='акцент голоса озвучки')

    system_notification = models.BooleanField(default=True, verbose_name='системные уведомления')
    support_message = models.BooleanField(default=True, verbose_name='сообщения от службы поддержки')
    payment_info = models.BooleanField(default=True, verbose_name='информация об оплате')
    reminders_about_lessons = models.BooleanField(default=True, verbose_name='напоминания об уроках')
    discounts = models.BooleanField(default=True, verbose_name='скидки, акции, подарки')
    sounds = models.BooleanField(default=False, verbose_name='звуки при выполнении упражнений')

    age = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='возраст')

    wallet = models.OneToOneField('Wallet', on_delete=models.PROTECT)

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = 'ученик'
        verbose_name_plural = '02 | Ученики'


class Wallet(CommonId):

    def __str__(self):
        return f'{self.pk}'

    class Meta:
        verbose_name = 'кошелек'
        verbose_name_plural = '03 | Кошельки'
