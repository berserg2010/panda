from datetime import datetime
import pytest

from django.utils import timezone

from common.utils import date_now, get_timedelta
from ..services.payment import get_valid_until
from ..models import Payment


pytestmark = pytest.mark.django_db


def get_order_time(days: int) -> datetime:
    order_time = date_now() - timezone.timedelta(days=days)
    return order_time


class TestPayment:

    def test_save(self, create_student, create_course, create_payment):
        student = create_student()
        course = create_course()

        order_time_zero = get_timedelta(days=-43)
        payment_zero = create_payment(
            student,
            course.group_of_course,
            order_time_zero,
        )
        assert Payment.objects.count() == 1
        assert payment_zero.first_payment is None
        assert payment_zero.valid_until == get_valid_until(order_time_zero)

        order_time_one = get_timedelta(days=-29)
        payment_one = create_payment(
            student,
            course.group_of_course,
            order_time_one,
        )
        assert Payment.objects.count() == 2
        assert payment_one.first_payment == payment_zero
        assert payment_one.valid_until == get_valid_until(order_time_one)

        order_time_two = get_timedelta()
        payment_two = create_payment(
            student,
            course.group_of_course,
            order_time_two,
        )
        assert Payment.objects.count() == 3
        assert payment_two.first_payment is None
        assert payment_two.valid_until == get_valid_until(order_time_two)

        payment_zero.first_payment = payment_two
        payment_zero.save()
        assert payment_zero.first_payment is None
        assert payment_zero.valid_until == get_valid_until(order_time_zero)

        order_time_third = get_timedelta(days=14)
        payment_third = create_payment(
            student,
            course.group_of_course,
            order_time_third,
        )
        assert Payment.objects.count() == 4
        assert payment_third.first_payment == payment_two
        assert payment_third.valid_until == get_valid_until(order_time_third)

        payment_zero.first_payment = payment_zero
        payment_zero.save()
        assert payment_zero.first_payment is None
        assert payment_zero.valid_until == get_valid_until(order_time_zero)
