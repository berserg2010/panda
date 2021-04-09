import pytest
from mixer.backend.django import mixer
from datetime import datetime

from django.utils import timezone

from common.utils import date_now
from course.models import Course
from ..services.payment import get_valid_until
from ..models import Student, Payment


pytestmark = pytest.mark.django_db


def get_order_time(days: int) -> datetime:
    order_time = date_now() - timezone.timedelta(days=days)
    return order_time


class TestPayment:
    def test_save(self):
        student = mixer.blend(Student)
        course = mixer.blend(Course)

        order_time = get_order_time(84)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=mixer.SKIP,
            group_of_course=course.group_of_course,
        )
        assert Payment.objects.count() == 1
        assert instance.first_payment is None
        assert instance.valid_until == get_valid_until(order_time)

        instance.save()
        assert Payment.objects.count() == 1
        assert instance.first_payment is None

        order_time = get_order_time(42)
        first_payment = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=get_valid_until(order_time),
            group_of_course=course.group_of_course,
        )
        assert Payment.objects.count() == 2
        assert first_payment.first_payment is None

        instance.save()
        assert Payment.objects.count() == 2
        assert instance.first_payment is None

        order_time = get_order_time(28)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=get_valid_until(order_time),
            group_of_course=course.group_of_course,
        )
        assert Payment.objects.count() == 3
        assert instance.first_payment is not None
        assert instance.first_payment == first_payment

        order_time = get_order_time(14)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=get_valid_until(order_time),
            group_of_course=course.group_of_course,
        )
        assert Payment.objects.count() == 4
        assert instance.first_payment is not None
        assert instance.first_payment == first_payment
