import requests
from typing import Union

from django.contrib.auth import get_user_model
# from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db import transaction, IntegrityError

from backend import settings
from common.utils import date_now, new_password
from account.models import RequestUser, Student, Teacher
from account.services.mail import (
    send_mail_request_user_accept,
    send_mail_request_user_reject,
)
from paid_course.models import FreeLesson


def request_user_accept(obj: RequestUser) -> str:

    password, password_hash = new_password()
    user = get_user_model()(
        username=obj.email,
        email=obj.email,
        password=password_hash,
        first_name=obj.first_name,
        last_name=obj.last_name,
    )
    student = Student(
        user=user,
        phone=obj.phone,
    )
    free_lesson = FreeLesson(
        student=student,
    )
    obj.accept = True
    obj.check_date = date_now()

    try:
        with transaction.atomic():
            user.save()
            student.save()
            free_lesson.save()
            obj.save()

    except IntegrityError:
        message = 'Что то пошло не так..'
    else:
        message = 'Заявка принята'
        send_mail_request_user_accept(user.email, password)
        user_voximplant_handler(student, 'add')

    return message


def request_user_reject(obj: RequestUser) -> str:

    obj.accept = False
    obj.check_date = date_now()
    obj.save()

    send_mail_request_user_reject(obj.email)

    return 'Заявка отклонена'


def user_voximplant_handler(account, method: str):
    method_dict = {
        'add': 'AddUser',
        'del': 'DelUser',
    }
    payload = {
        'account_id': settings.VOXIMPLANT_ACC_ID,
        'api_key': settings.VOXIMPLANT_API_KEY,
        'application_id': settings.VOXIMPLANT_APP_ID,
        'user_name': account.id,
    }

    if method == 'add':
        payload.update({
            'user_display_name': account.get_full_name(),
            'user_password': settings.VOXIMPLANT_USER_PASSWORD,
        })

    res = requests.get(f'https://api.voximplant.com/platform_api/{method_dict.get(method)}', params=payload)
    return res


def get_account(user: User) -> Union[Teacher, Student]:
    account_model = Teacher if user.is_staff else Student
    account = account_model.objects.get(user=user)
    return account
