from django import template
from django.db.models import Sum, Q

register = template.Library()


# @register.filter
# def finished(paid_course_lessons: [LessonResults], check: bool) -> [LessonResults]:
#     return paid_course_lessons.filter(finished=check)


@register.filter
def filter_group_of_courses_sum_paid_for_lessons(obj: list, value_filter) -> int:

    paid_filter = Q(group_of_courses=value_filter)

    return obj.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)


@register.filter
def filter_group_of_courses_sum_bonus(obj: list, value_filter) -> int:

    paid_filter = Q(group_of_courses=value_filter, bonus__isnull=False)

    return obj.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)


@register.filter
def filter_group_of_courses_latest_date(obj: list, value_filter):

    paid_filter = Q(group_of_courses=value_filter)

    return obj.filter(paid_filter).latest('valid_until').valid_until

