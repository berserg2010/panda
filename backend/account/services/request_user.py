from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db import transaction, IntegrityError

from common.utils import date_now, new_password
from account.models import RequestUser, Student
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
    obj.check_date = date_now

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

    return message


def request_user_reject(obj: RequestUser) -> str:

    obj.accept = False
    obj.check_date = date_now
    obj.save()

    send_mail_request_user_reject(obj.email)

    return 'Заявка отклонена'
