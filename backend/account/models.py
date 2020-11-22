from django.db import models
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.utils import timezone
import pytz

from common.utils import date_now
from common.models import CommonId
from course.models import GroupsOfCourses



GENDER = [
    ('U', 'Undefined'),
    ('M', 'male'),
    ('F', 'female'),
]

TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))


class RequestUser(CommonId):

    name = models.CharField(max_length=50, verbose_name='имя')
    email = models.CharField(max_length=50, verbose_name='эл. почта')
    phone = models.CharField(max_length=20, verbose_name='телефон')

    sending_date = models.DateTimeField(auto_now_add=True, verbose_name='дата отправки')
    check_date = models.DateTimeField(null=True, blank=True, verbose_name='дата проверки')

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'запрос пользователя'
        verbose_name_plural = '01 | Запросы пользователей'


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
        verbose_name_plural = '02 | Учителя'


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

    @property
    def get_payment_student(self):
        return self.payment_student.all()

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = 'ученик'
        verbose_name_plural = '03 | Ученики'


class Payment(CommonId):

    paid_for_lessons = models.PositiveSmallIntegerField(verbose_name='оплачено занятий')
    payment = models.PositiveSmallIntegerField(verbose_name='ID платежа')
    amount = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='сумма заказа')

    order = models.CharField(max_length=1024, verbose_name='ID заказа')

    order_time = models.DateTimeField(verbose_name='оплата была произведена')
    valid_until = models.DateField(default=date_now + timezone.timedelta(days=28), verbose_name='действительно до')

    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='payment_student', verbose_name='ученик')
    bonus = models.ForeignKey(Student, null=True, blank=True, on_delete=models.PROTECT, related_name='payment_bonus', verbose_name='бонус')
    group_of_courses = models.ForeignKey(GroupsOfCourses, on_delete=models.PROTECT, verbose_name='группа курса')
    first_payment = models.ForeignKey(
        'Payment',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='last_payment',
        verbose_name='первая оплата'
    )

    def get_first_data_payment(self):
        if self.first_payment is None:
            return '--'
        return self.first_payment.order_time
    get_first_data_payment.short_description = 'первая дата оплаты'


    @property
    def is_bonus(self):
        return True if self.bonus is not None else False
    get_first_data_payment.short_description = 'бесплатные занятия'


    def save(self, **kwargs):

        payment = Payment.objects.filter(
            student=self.student,
            group_of_courses=self.group_of_courses,
            valid_until__gte=self.order_time,
        ).first()

        self.first_payment = payment.first_payment if (
            payment and payment.first_payment is not None
        ) else payment

        super().save(self, **kwargs)


    def __str__(self):
        return f'{self.pk}'


    class Meta:
        verbose_name = 'платеж'
        verbose_name_plural = '04 | Платежи'
        ordering = ('-valid_until', 'student__user__last_name')
