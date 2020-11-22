import pytest
from mixer.backend.django import mixer
from django.utils import timezone

from common.utils import date_now
from ..models import Student, Payment
from course.models import GroupsOfCourses


pytestmark = pytest.mark.django_db


class TestPayment:

    def test_save(self):

        student = mixer.blend(Student)
        group = mixer.blend(GroupsOfCourses)

        order_time = date_now - timezone.timedelta(days=84)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=order_time + timezone.timedelta(days=28),
            group_of_courses=group,
        )
        assert Payment.objects.count() == 1
        assert instance.first_payment is None

        order_time = date_now - timezone.timedelta(days=42)
        first_payment = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=order_time + timezone.timedelta(days=28),
            group_of_courses=group,
        )
        assert Payment.objects.count() == 2
        assert first_payment.first_payment is None

        order_time = date_now - timezone.timedelta(days=28)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=order_time + timezone.timedelta(days=28),
            group_of_courses=group,
        )
        assert Payment.objects.count() == 3
        assert instance.first_payment is not None
        assert instance.first_payment == first_payment


        order_time = date_now - timezone.timedelta(days=14)
        instance = mixer.blend(
            Payment,
            student=student,
            order_time=order_time,
            valid_until=order_time + timezone.timedelta(days=28),
            group_of_courses=group,
        )
        assert Payment.objects.count() == 4
        assert instance.first_payment is not None
        assert instance.first_payment == first_payment
