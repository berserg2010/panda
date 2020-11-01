from django import template

from ..models import PaidCourseLesson


register = template.Library()


@register.filter
def get_list_item(lst, index):
    try:
        return lst[index].datetime
    except IndexError:
        return '--'


@register.filter
def string_lines_to_list(string: str):
    try:
        return (line.strip() for line in string.splitlines() )
    except IndexError:
        return ''


@register.filter
def finished(paid_course_lessons: [PaidCourseLesson], check: bool) -> [PaidCourseLesson]:
    return paid_course_lessons.filter(finished=check)


@register.filter
def filter_count(paid_course_lessons: [PaidCourseLesson]) -> [PaidCourseLesson]:
    print(paid_course_lessons)
    return paid_course_lessons.count()

