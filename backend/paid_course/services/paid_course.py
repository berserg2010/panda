from datetime import datetime
from pydantic import BaseModel
from typing import Tuple, List
import uuid

from django.db.models import Q, Sum
from django.db.models.query import QuerySet

from common.utils import date_now
from account.models import Payment
from ..models import Schedule


class GroupCoursesStat(BaseModel):
    title: str = ''
    lessons: int = 0
    bonus: int = 0
    valid_until: datetime = ''


def get_chain_of_payments(last_payment_qs: QuerySet[Payment], group_of_course: uuid) -> Tuple[QuerySet[Payment], datetime]:

    last_payment = last_payment_qs.filter(valid_until__gte=date_now()).filter(group_of_course=group_of_course).first()

    if last_payment is not None and last_payment.first_payment is not None:
        order_time = last_payment.first_payment.order_time
        combine_filter = Q(
            Q(order_time__gte=order_time) | Q(valid_until__gte=date_now()),
        )
        active_payments = last_payment_qs.filter(combine_filter).order_by('valid_until')
    elif last_payment is not None:
        order_time = last_payment.order_time
        active_payments = last_payment_qs.filter(pk=last_payment.pk)
    else:
        order_time = ''
        active_payments = Payment.objects.none()

    return active_payments, order_time


def get_sum_paid_lessons(obj: QuerySet[Payment]) -> int:
    return obj.aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)


def get_courses_stat(user) -> List[GroupCoursesStat]:
    groups_courses_stat: List[GroupCoursesStat] = []
    student = user.student

    last_payment_qs = student.get_payment_student
    last_payment_distinct_qs = last_payment_qs.filter(valid_until__gte=date_now()).order_by(
        'group_of_course__pk', '-valid_until'
    ).distinct('group_of_course')

    for last_payment_inst in last_payment_distinct_qs:

        active_payments, order_time = get_chain_of_payments(last_payment_qs, last_payment_inst.group_of_course)

        title = last_payment_inst.group_of_course.title
        paid_filter = Q(group_of_course=last_payment_inst.group_of_course)
        lessons = get_sum_paid_lessons(active_payments.filter(paid_filter))
        bonus_qs = active_payments.filter(paid_filter & Q(bonus__isnull=False))

        if bonus_qs.exists():
            bonus = get_sum_paid_lessons(bonus_qs)
        else:
            bonus = 0

        valid_until = active_payments.filter(paid_filter).latest('valid_until').valid_until

        schedule = Schedule.get_student_schedule(
            student,
            last_payment_inst.group_of_course,
            order_time
        ).filter(finished=True).count()

        bonus -= schedule
        lessons -= schedule

        group_courses_stat = GroupCoursesStat(
            title=title,
            lessons=lessons if lessons > 0 else 0,
            bonus=bonus if bonus > 0 else 0,
            valid_until=valid_until
        )

        groups_courses_stat.append(group_courses_stat)

    return groups_courses_stat
