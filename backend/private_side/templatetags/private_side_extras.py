from django import template
from django.conf import settings
from django.utils import timezone
from typing import Union
from datetime import datetime

from common.utils import date_now
from paid_course.models import (
    FreeLesson,
    PaidCourse,
    LessonResults,
    Schedule,
)


register = template.Library()


@register.filter
def get_statistic_result(paid_course_lessons: [LessonResults], field: str) -> str:

    finished_paid_course_lessons: [LessonResults] = paid_course_lessons.filter(finished=True)
    count_finished: int = finished_paid_course_lessons.count()

    sum_true_result: float = 0
    default_result: str = '0.0'

    try:
        for lesson in finished_paid_course_lessons:
            sum_true_result += getattr(lesson, field)
    except AttributeError:
        return default_result

    try:
        return str(sum_true_result / count_finished)
    except ZeroDivisionError:
        return default_result


@register.filter
def get_last_date_lesson(current_course: PaidCourse):

    schedules = current_course.schedule_set.all()

    if not schedules.exists():
        return None

    count_finished_lessons = current_course.paid_course_lessons.filter(finished=True).count()
    last_date_lesson = schedules[count_finished_lessons - 1].datetime

    return last_date_lesson


@register.filter
def get_settings_var(name: str):
    settings_var = getattr(settings, name, '')
    return settings_var


@register.filter
def get_classname(obj: Union[Schedule, FreeLesson]):
    classname = obj.__class__.__name__
    return classname


@register.filter
def is_time_delta_8_hours(dt: datetime):
    condition = date_now <= dt - timezone.timedelta(hours=8)
    return condition
