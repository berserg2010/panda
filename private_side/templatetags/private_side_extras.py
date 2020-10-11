from django import template

from course.models import CourseLesson


register = template.Library()


@register.filter
def get_statistic_result(course_lessons: [CourseLesson], field: str) -> str:

    finished_course_lessons: [CourseLesson] = course_lessons.filter(finished=True)
    count_finished: int = finished_course_lessons.count()

    sum_true_result: float = 0

    try:
        for lesson in finished_course_lessons:

            sum_true_result += getattr(lesson, field)

    except AttributeError:
        return '0.0'

    return str(sum_true_result / count_finished)
