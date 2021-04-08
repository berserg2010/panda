from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from common.models import CommonId
from course.models import GroupsOfCourses


GENDER = [
    ('U', 'Undefined'),
    ('M', 'male'),
    ('F', 'female'),
]


class RequestUser(CommonId):

    accept = models.BooleanField(null=True, default=None, verbose_name='заявка принята')

    first_name = models.CharField(max_length=50, verbose_name='имя')
    last_name = models.CharField(max_length=50, verbose_name='фамилия')
    email = models.CharField(max_length=50, verbose_name='эл. почта')
    phone = models.CharField(max_length=20, verbose_name='телефон')

    sending_date = models.DateTimeField(auto_now_add=True, verbose_name='дата отправки')
    check_date = models.DateTimeField(null=True, blank=True, verbose_name='дата проверки')

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    get_full_name.short_description = 'И.Ф.'

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'запрос пользователя'
        verbose_name_plural = '01 | Запросы пользователей'


class Account(CommonId):

    gender = models.CharField(choices=GENDER, max_length=1, default='U', verbose_name='пол')
    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name='телефон')

    avatar = models.ImageField(upload_to='img/account/', default='img/account/default.svg', verbose_name='аватар')

    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, verbose_name='учётная запись')

    def get_full_name(self):
        return self.user.get_full_name()
    get_full_name.short_description = 'И.Ф.'

    def get_email(self):
        return self.user.email
    get_email.short_description = 'Эл. почта'

    class Meta:
        abstract = True


class Teacher(Account):

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = 'учитель'
        verbose_name_plural = '02 | Учителя'


class Student(Account):

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

    payment = models.PositiveIntegerField(verbose_name='ID платежа')
    amount = models.PositiveIntegerField(null=True, blank=True, verbose_name='сумма заказа')

    order = models.CharField(max_length=1024, verbose_name='ID заказа')

    order_time = models.DateTimeField(verbose_name='оплата была произведена')
    valid_until = models.DateTimeField(blank=True, verbose_name='действительно до')

    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='payment_student', verbose_name='ученик')
    bonus = models.ForeignKey(Student, null=True, blank=True, on_delete=models.PROTECT, related_name='payment_bonus', verbose_name='бонус')
    group_of_course = models.ForeignKey(GroupsOfCourses, on_delete=models.PROTECT, verbose_name='группа курса')
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
            return None
        return self.first_payment.order_time
    get_first_data_payment.short_description = 'первая дата оплаты'

    def save(self, *args, **kwargs):

        if not self.first_payment:
            payment = Payment.objects.filter(
                student=self.student,
                group_of_course=self.group_of_course,
                order_time__lte=self.order_time,
                valid_until__gte=self.order_time,
            ).first()

            first_payment = payment.first_payment if (
                payment and payment.first_payment is not None
            ) else payment

            if first_payment and first_payment.pk != self.pk:
                self.first_payment = first_payment

        if not self.valid_until:
            self.valid_until = self.order_time + timezone.timedelta(days=28)

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.pk}'

    class Meta:
        verbose_name = 'платеж'
        verbose_name_plural = '04 | Платежи'
        ordering = ('-valid_until', 'student__user__last_name')
