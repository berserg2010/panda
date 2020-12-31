from copy import deepcopy
from datetime import datetime
import json

from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.db import transaction, IntegrityError
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.edit import FormView

from common.utils import (
    new_password,
    get_user_context,
    message_success,
    message_error,
)
from account.models import Student, Payment
from account.forms import (
    RequestUserForm,
    RecoverPasswordForm,
    SettingsUserForm,
)
from account.services.mail import (
    send_mail_request_user,
    send_mail_request_user_admin,
    send_mail_payment,
    send_mail_payment_admin,
    send_mail_bonus, send_mail_recover_password,
)
from course.models import Course
from paid_course.models import FreeLesson, PaidCourse


class AccountLoginView(LoginView):
    template_name = 'public/index.html'


def request_user(request):
    message = message_error('Некорректные данные')

    if request.method == 'POST':
        form = RequestUserForm(request.POST)

        if form.is_valid():
            user = get_user_model().objects.filter(email=form.cleaned_data.get('email')).exists()

            if user:
                message = message_error('Вы уже зарегистрированы!')
            else:
                user = form.save()

                send_mail_request_user(user.email)
                send_mail_request_user_admin(user)

                message = message_success('Вы оставили заявку!')

    return JsonResponse(message)


def recover_password(request):
    message = {}

    if request.method == 'POST':
        form = RecoverPasswordForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data.get('email')

            try:
                user = get_user_model().objects.get(username=email)
            except ObjectDoesNotExist:
                message = message_error('Нет такого пользователя')
            except MultipleObjectsReturned:
                message = message_error('Это невозможно! Найдено несколько пользователей!')
            else:
                password, password_hash = new_password()
                user.password = password_hash
                user.save()

                send_mail_recover_password(email, password)

                message = message_success(f'Новый пароль отправлен на почту {email}')
            finally:
                return JsonResponse(message)

        else:
            return JsonResponse(message_error('Некорректный адрес эл. почты'))


@csrf_exempt
def payment_callback(request):

    if request.method == 'POST':
        response_status = request.POST.get('response_status')
        order_status = request.POST.get('order_status')

        if response_status == 'success' and order_status == 'approved':
            context = message_success('Оплата прошла успешно!')

            payment_id = request.POST.get('payment_id')
            order_id = request.POST.get('order_id')
            actual_amount = int(request.POST.get('actual_amount')) // 100
            order_time = datetime.strptime(request.POST.get('order_time'), '%d.%m.%Y %H:%M:%S')

            merchant_data = {
                i.get('name'): i.get('value')
                for i in json.loads(request.POST.get('merchant_data'))
            }
            student_id = merchant_data.get('student_id')
            bonus_id = merchant_data.get('bonus_id')
            course_id = merchant_data.get('course_id')
            paid_for_lessons = merchant_data.get('paid_for_lessons')

            student = Student.objects.get(pk=student_id)
            bonus_student = Student.objects.none()
            course = Course.objects.get(pk=course_id)

            payment_base = Payment(
                payment=payment_id,
                amount=actual_amount,
                order=order_id,
                order_time=order_time,

                paid_for_lessons=paid_for_lessons,
                student=student,
                group_of_course=course.group_of_course,
            )

            payment_bonus = None
            payment_bonus_ = None
            condition = bonus_id and Student.objects.filter(
                pk=bonus_id, user__is_active=True
            ).exclude(pk=student.pk).exists()
            if condition:
                bonus_student = Student.objects.get(pk=bonus_id)
                payment_bonus = deepcopy(payment_base)

                payment_bonus.pk = None
                payment_bonus.amount = None
                payment_bonus.order_time = timezone.now()
                payment_bonus.paid_for_lessons = 2
                payment_bonus.bonus = bonus_student

                payment_bonus_ = deepcopy(payment_bonus)
                payment_bonus_.pk = None
                payment_bonus_.student = bonus_student
                payment_bonus_.bonus = student

            paid_course = None
            if not PaidCourse.objects.filter(student=student, course=course).exists():
                paid_course = PaidCourse(
                    student=student,
                    course=course,
                )

            try:
                with transaction.atomic():
                    payment_base.save()

                    if payment_bonus is not None and payment_bonus_ is not None:
                        payment_bonus.save()
                        payment_bonus_.save()

                    if paid_course is not None:
                        paid_course.save()

            except IntegrityError:
                context = message_error(f'Что то пошло не так..')
            else:

                send_mail_payment(
                    student.user.email,
                    payment_id, student.user.first_name, paid_for_lessons,
                    condition
                )

                if condition:
                    send_mail_bonus(bonus_student.user.email)

                send_mail_payment_admin(payment_id, student.user.first_name, paid_for_lessons)

        else:
            context = message_error(f'Что то пошло не так..\nСтатус обработки заказа: {order_status}')

        return render(
            request,
            'public/blank_status_operation.html',
            context,
        )

    return HttpResponseRedirect('/')


class SettingsUserView(LoginRequiredMixin, FormView):

    template_name = 'private/settings_user.html'
    form_class = SettingsUserForm
    success_url = reverse_lazy('account:settings_user')

    def post(self, request, *args, **kwargs):
        form = self.get_form()

        if form.is_valid():

            user = request.user
            current_user = get_user_context(request, is_filter=False)

            user.first_name = form.cleaned_data.get('first_name')
            user.last_name = form.cleaned_data.get('last_name')

            current_user.phone = form.cleaned_data.get('phone')

            if form.cleaned_data.get('avatar'):
                current_user.avatar = form.cleaned_data.get('avatar')

            user.save()
            current_user.save()

            return self.form_valid(form)
