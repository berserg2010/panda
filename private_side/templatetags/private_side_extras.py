from django import template
from django.conf import settings

from course.models import PaidCourse, PaidCourseLesson


register = template.Library()


@register.filter
def get_statistic_result(paid_course_lessons: [PaidCourseLesson], field: str) -> str:

    finished_paid_course_lessons: [PaidCourseLesson] = paid_course_lessons.filter(finished=True)
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
def get_last_date_lesson(course: PaidCourse):

    schedules = course.schedule_set.all()

    coutn_finished_lessons = course.courselesson_set.filter(finished=True).count()

    return schedules[coutn_finished_lessons].datetime


@register.filter
def get_settings_var(name: str):
    return getattr(settings, name, '')
