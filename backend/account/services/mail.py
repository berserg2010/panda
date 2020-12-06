from django.core.mail import send_mail

from backend import settings
from account.models import RequestUser, Student


def send_mail_request_user(email: str) -> None:

    body = '''
    Вы оставили заявку на сайте Panda!
    С Вами скоро свяжутся.
    '''
    _body_send_mail(body, email)


def send_mail_request_user_admin(user: RequestUser) -> None:

    body = (
        f'{user.first_name} {user.last_name} оставил заявку.\n'
        f'ID заявки: {user.pk}\n'
        f'Телефон: {user.phone}\n'
        f'Эл. почта: {user.email}\n'
    )
    _body_send_mail(body)


def send_mail_request_user_accept(email: str, password: str) -> None:

    body = (
        'Вы зарегистрированы на сайте Panda!\n'
        f'Логин: {email}\n'
        f'Пароль: {password}'
    )
    _body_send_mail(body, email)


def send_mail_request_user_accept_admin(student: Student) -> None:

    body = (
        f'{student.user.get_full_name()} зарегистрировался.\n'
        f'ID: {student.pk}\n'
        f'Телефон: {student.phone}\n'
        f'Эл. почта: {student.user.email}\n'
    )
    _body_send_mail(body)


def send_mail_request_user_reject(email: str) -> None:

    body = (
        'К сожалению, мы не можем зарегистрировать вас на нашем сайте.\n'
        'Обратитесь в нашу службу поддержки.'
    )
    _body_send_mail(body, email)


def send_mail_payment(email: str,
                      payment_id, student_name: str, number_for_lessons: int,
                      is_free_lessons: bool=False) -> None:

    free_lessons = 'Плюс 2 бесплатных занятия.\n' if is_free_lessons else ''

    body = (
        f'{student_name}, Вы оплатили {number_for_lessons} занятий.\n'
        f'{free_lessons}'
        f'ID платежа: {payment_id}\n'
    )
    _body_send_mail(body, email)


def send_mail_payment_admin(payment_id, student_name: str, number_for_lessons: int) -> None:

    body = (
        f'{student_name} оплатил {number_for_lessons} занятий.\n'
        f'ID платежа: {payment_id}\n'
    )
    _body_send_mail(body)


def send_mail_bonus(email: str) -> None:

    body = (
        f'Ваш друг воспльзовался бонусным кодом.\n'
        f'Вам начислено 2 бесплатных занятия.\n'
    )
    _body_send_mail(body, email)


def _body_send_mail(body: str, email: str=settings.EMAIL_HOST_USER):
    send_mail(
        'Panda',
        body,
        settings.EMAIL_HOST_USER,
        [email],
    )
