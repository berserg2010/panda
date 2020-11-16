from django import template
from django.conf import settings

from paid_course.models import PaidCourse, LessonResults


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
def get_last_date_lesson(paid_course: PaidCourse):

    schedules = paid_course.schedule_set.all()

    count_finished_lessons = paid_course.paid_course_lessons.filter(finished=True).count()

    return schedules[count_finished_lessons - 1].datetime if count_finished_lessons else '--'


@register.filter
def get_settings_var(name: str):
    return getattr(settings, name, '')
