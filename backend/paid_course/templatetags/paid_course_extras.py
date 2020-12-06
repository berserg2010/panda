from django import template
from django.db.models import Sum, Q, QuerySet

register = template.Library()


@register.filter
def filter_group_of_courses_sum_paid_for_lessons(obj: QuerySet, value_filter) -> int:

    paid_filter = Q(group_of_courses=value_filter)

    return obj.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)


@register.filter
def filter_group_of_courses_sum_bonus(obj: QuerySet, value_filter) -> int:

    paid_filter = Q(group_of_courses=value_filter, bonus__isnull=False)

    return obj.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)


@register.filter
def filter_group_of_courses_latest_date(obj: QuerySet, value_filter):

    paid_filter = Q(group_of_courses=value_filter)

    return obj.filter(paid_filter).latest('valid_until').valid_until


@register.filter
def get_count(qs):
    return qs.count()
