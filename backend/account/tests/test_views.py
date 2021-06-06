from datetime import datetime
from json import dumps
from mixer.backend.django import mixer
from pydantic import  BaseModel
import pytest
from rest_framework import status
from typing import Optional, Tuple, List, Union, Any
from uuid import UUID, uuid4

from django.contrib.auth import get_user_model

from common.utils import date_now
from account.models import RequestUser, Payment, Promo


pytestmark = pytest.mark.django_db


def test_request_user(client):

    data = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
    }
    response = client.post('/request-user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {'status': 'error', 'message': 'Некорректные данные'}
    assert RequestUser.objects.count() == 0

    data = {
        'first_name': 'Vasia',
        'last_name': 'Vasiliev',
        'email': 'vasia@yandex.ru',
        'phone': '7896543210',
    }

    response = client.post('/request-user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {'status': 'success', 'message': 'Вы оставили заявку!'}
    assert RequestUser.objects.count() == 1

    req_user = RequestUser.objects.get(email=data.get('email'))
    assert req_user.first_name == data.get('first_name')
    assert req_user.last_name == data.get('last_name')
    assert req_user.email == data.get('email')
    assert req_user.phone == data.get('phone')

    mixer.blend(
        get_user_model(),
        email='vasia@yandex.ru',
    )

    response = client.post('/request-user/', data=data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {'status': 'error', 'message': 'Вы уже зарегистрированы!'}
    assert RequestUser.objects.count() == 1


class FondyResponseModel(BaseModel):
    response_status: str = 'success'
    order_status: str = 'approved'
    payment_id: int
    actual_amount: int
    order_id: int
    order_time: str
    merchant_data: str
    bonus_id: str = ''


class MerchantDataModel(BaseModel):
    name: str
    value: Union[str, int]


def test_payment_error_callback(client, create_student, create_course):
    student_one = create_student()
    course = create_course()

    student_one_merchant_data = MerchantDataModel(
        name='student_id',
        value=str(student_one.pk),
    )
    course_merchant_data = MerchantDataModel(
        name='course_id',
        value=str(course.pk),
    )
    paid_for_lessons_merchant_data = MerchantDataModel(
        name='paid_for_lessons',
        value=4,
    )

    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
    ]

    fondy_response = FondyResponseModel(
        response_status='failure',
        order_status='declined',
        payment_id=1,
        actual_amount=10020,
        order_id=1,
        order_time=str(date_now().strftime('%d.%m.%Y %H:%M:%S')),
        merchant_data=dumps(merchant_data),
    )
    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'error'
    assert response.context.get('message') == 'Что то пошло не так..\nСтатус обработки заказа: declined'
    assert Payment.objects.count() == 0


def test_payment_success(client, create_student, create_course):
    student_one = create_student()
    course = create_course()

    student_one_merchant_data = MerchantDataModel(
        name='student_id',
        value=str(student_one.pk),
    )
    course_merchant_data = MerchantDataModel(
        name='course_id',
        value=str(course.pk),
    )
    paid_for_lessons_merchant_data = MerchantDataModel(
        name='paid_for_lessons',
        value=4,
    )

    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
    ]

    fondy_response = FondyResponseModel(
        payment_id=1,
        actual_amount=10020,
        order_id=1,
        order_time=str(date_now().strftime('%d.%m.%Y %H:%M:%S')),
        merchant_data=dumps(merchant_data),
    )
    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get('message') == 'Оплата прошла успешно!'
    assert Payment.objects.count() == 1


def test_payment_bonus(client, create_student, create_student_two, create_course):
    student_one = create_student()
    student_two = create_student_two()
    course = create_course()

    student_one_merchant_data = MerchantDataModel(
        name='student_id',
        value=str(student_one.pk),
    )
    course_merchant_data = MerchantDataModel(
        name='course_id',
        value=str(course.pk),
    )
    paid_for_lessons_merchant_data = MerchantDataModel(
        name='paid_for_lessons',
        value=4,
    )
    bonus_id = uuid4()
    bonus_id_merchant_data = MerchantDataModel(
        name='bonus_id',
        value=str(bonus_id),
    )

    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
        bonus_id_merchant_data.dict(),
    ]

    fondy_response = FondyResponseModel(
        payment_id=1,
        actual_amount=10020,
        order_id=1,
        order_time=str(date_now().strftime('%d.%m.%Y %H:%M:%S')),
        merchant_data=dumps(merchant_data),
    )
    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get('message') == f'Оплата прошла успешно, но промо код {bonus_id} не прошёл проверку.\nОбратитесь в службу поддержки.'
    assert Payment.objects.count() == 1

    bonus_id_merchant_data = MerchantDataModel(
        name='bonus_id',
        value=str(student_two.pk),
    )

    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
        bonus_id_merchant_data.dict(),
    ]

    fondy_response.merchant_data = dumps(merchant_data)

    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get('message') == f'Оплата прошла успешно, промо код {student_two.pk} зарегистрирован.'
    assert Payment.objects.count() == 4


def test_payment_promo(client, create_student, create_student_two, create_course):
    student = create_student()
    promo: Promo = mixer.blend(
        Promo,
        order_time=date_now(),
        valid_until=mixer.SKIP,
    )

    course = create_course()

    student_one_merchant_data = MerchantDataModel(
        name='student_id',
        value=str(student.pk),
    )
    course_merchant_data = MerchantDataModel(
        name='course_id',
        value=str(course.pk),
    )
    paid_for_lessons_merchant_data = MerchantDataModel(
        name='paid_for_lessons',
        value=4,
    )
    bonus_id = 'TEST'
    bonus_id_merchant_data = MerchantDataModel(
        name='bonus_id',
        value=bonus_id,
    )

    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
        bonus_id_merchant_data.dict(),
    ]

    fondy_response = FondyResponseModel(
        payment_id=1,
        actual_amount=10020,
        order_id=1,
        order_time=str(date_now().strftime('%d.%m.%Y %H:%M:%S')),
        merchant_data=dumps(merchant_data),
    )
    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get(
        'message') == f'Оплата прошла успешно, но промо код {bonus_id} не прошёл проверку.\nОбратитесь в службу поддержки.'
    assert Payment.objects.count() == 1

    bonus_id_merchant_data = MerchantDataModel(
        name='bonus_id',
        value=promo.code,
    )
    merchant_data = [
        student_one_merchant_data.dict(),
        course_merchant_data.dict(),
        paid_for_lessons_merchant_data.dict(),
        bonus_id_merchant_data.dict(),
    ]

    fondy_response.merchant_data = dumps(merchant_data)

    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get('message') == f'Оплата прошла успешно, промо код {promo.code} зарегистрирован.'
    assert Payment.objects.count() == 3

    response = client.post('/payment-callback/', data=fondy_response.dict())
    assert response.status_code == status.HTTP_200_OK
    assert response.context.get('status') == 'success'
    assert response.context.get('message') == f'Оплата прошла успешно, но промо код {promo.code} не прошёл проверку.\nОбратитесь в службу поддержки.'
    assert Payment.objects.count() == 4
