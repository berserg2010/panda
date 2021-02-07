import pytest
from mixer.backend.django import mixer
from rest_framework import status
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.status import HTTP_200_OK

from conftest import ParameterStorage
from common.utils import date_now
from account.models import Student, Payment
from course.models import GroupsOfCourses
from private_side.urls import urlpatterns


pytestmark = pytest.mark.django_db


@pytest.mark.parametrize('url', urlpatterns)
@pytest.mark.parametrize('client_fixture, errors', [
    ('client', status.HTTP_302_FOUND),
    ('student_register', status.HTTP_200_OK),
])
def test_get_private_side(url, client_fixture, errors, request):

    client = request.getfixturevalue(client_fixture)

    response = client.get(f'/lk/{url.pattern}')
    assert response.status_code == errors


@pytest.mark.skip
def test_context_groups_courses_stat(student_register):

    assert Student.objects.count() == 1
    student = get_user_model().objects.get(
        username=ParameterStorage.user_auth.get('username')
    ).student

    res = student_register.get('/lk/')
    assert res.status_code == HTTP_200_OK
    assert res.context['groups_courses_stat'] == []

    group_1 = mixer.blend(GroupsOfCourses)
    payment = mixer.blend(
        Payment,
        paid_for_lessons=2,
        order_time=date_now,
        valid_until=None,
        student=student,
        bonus=None,
        group_of_course=group_1,
        first_payment=None,
    )
    assert Payment.objects.count() == 1

    result_payment = {
        'title': group_1.title,
        'lessons': payment.paid_for_lessons,
        'bonus': 0,
        'valid_until': payment.valid_until,
    }

    res = student_register.get('/lk/')
    assert res.status_code == HTTP_200_OK
    assert res.context['groups_courses_stat'] == [result_payment]

    group_2 = mixer.blend(GroupsOfCourses)
    payment_2 = mixer.blend(
        Payment,
        paid_for_lessons=4,
        order_time=date_now + timezone.timedelta(days=1),
        valid_until=None,
        student=student,
        bonus=None,
        group_of_course=group_2,
        first_payment=None,
    )
    assert Payment.objects.count() == 2

    result_payment_2 = {
        'title': group_2.title,
        'lessons': payment_2.paid_for_lessons,
        'bonus': 0,
        'valid_until': payment_2.valid_until,
    }

    res = student_register.get('/lk/')
    assert res.status_code == HTTP_200_OK
    assert res.context['groups_courses_stat'] == [result_payment, result_payment_2]

    payment_3 = mixer.blend(
        Payment,
        paid_for_lessons=2,
        order_time=date_now + timezone.timedelta(days=2),
        valid_until=None,
        student=student,
        bonus=None,
        group_of_course=group_2,
        first_payment=payment_2,
    )
    assert Payment.objects.count() == 3

    result_payment_3 = {
        'title': group_2.title,
        'lessons': payment_2.paid_for_lessons + payment_3.paid_for_lessons,
        'bonus': 0,
        'valid_until': payment_3.valid_until,
    }

    res = student_register.get('/lk/')
    assert res.status_code == HTTP_200_OK
    assert res.context['groups_courses_stat'] == [result_payment, result_payment_3]
