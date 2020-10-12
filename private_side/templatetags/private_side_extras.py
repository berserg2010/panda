from django import template

from course.models import Course, CourseLesson


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


@register.filter
def get_last_date_lesson(course: Course):

    schedules = course.schedule_set.all()

    coutn_finished_lessons = course.courselesson_set.filter(finished=True).count()

    return schedules[coutn_finished_lessons].datetime
