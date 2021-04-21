from django.contrib import admin
from django.http import HttpResponseRedirect
from django.utils import timezone
from django.utils.safestring import mark_safe

from common.utils import CommonIdModelAdmin, date_now
from private_side.services.courses_stat import get_courses_stat
from .models import RequestUser, Teacher, Student, Payment, Promo
from .services.request_user import request_user_accept, request_user_reject


@admin.register(RequestUser)
class RequestUserAdmin(CommonIdModelAdmin):
    list_display = (
        'email',
        'get_full_name',
        'phone',
        'sending_date',
        'check_date',
        'accept',
    )
    list_display_links = ('email', )
    list_filter = ('accept', )
    change_form_template = 'admin/account/request_user.html'
    fields = (
        *CommonIdModelAdmin.fields,
        'email',
        'first_name',
        'last_name',
        'phone',
        'sending_date',
        'check_date',
        'accept',
    )
    readonly_fields = (
        'id',
        'sending_date',
        'check_date',
        'accept',
    )
    save_on_top = False

    def response_change(self, request, obj):
        if '_request_user_accept' in request.POST:
            result = request_user_accept(obj)
            self.message_user(request, result)

            return HttpResponseRedirect('.')
        elif '_request_user_reject' in request.POST:
            request_user_reject(obj)
            self.message_user(request, 'Заявка отклонена')

            return HttpResponseRedirect('.')
        return super().response_change(request, obj)


class AccountAdmin(CommonIdModelAdmin):
    list_display = (
        'get_full_name',
        'get_email',
        'phone',
    )
    search_fields = (
        'user__last_name',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'user',
        'phone',
        'gender',
        'avatar',
    )
    save_on_top = False


@admin.register(Teacher)
class TeacherAdmin(AccountAdmin):
    pass


def get_unfinished_lessons(obj: Student) -> str:
    courses_stat = get_courses_stat(obj.user)
    if courses_stat:
        inner_html: str = ''
        for course_stat in courses_stat:
            inner_html = inner_html + f'<p style="padding-left: 0;">Группа курсов: ' \
                                      f'<b>{course_stat.title}</b>, ' \
                                      f'количество занятий: ' \
                                      f'<b ' \
                                      f'style="color: {"green" if course_stat.lessons > 1 else "red"};"' \
                                      f'>{course_stat.lessons}</b>;</p>' \
                                      f'заканчивается: ' \
                                      f'<b ' \
                                      f'style="color: {"green" if course_stat.valid_until.date() > (date_now().date() + timezone.timedelta(days=5)) else "red"};"' \
                                      f'>{course_stat.valid_until.date()}</b>;</p>\n'
        return mark_safe(inner_html)
get_unfinished_lessons.short_description = 'статистика по курсам'


@admin.register(Student)
class StudentAdmin(AccountAdmin):
    list_display = (
        *AccountAdmin.list_display,
        get_unfinished_lessons,
    )


class BonusLesson(admin.SimpleListFilter):
    title = 'бесплатные занятия'
    parameter_name = 'is_bonus'

    def lookups(self, request, model_admin):
        return (
            ('true', 'Да'),
            ('false', 'Нет'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'true':
            return queryset.filter(bonus__isnull=False)
        if self.value() == 'false':
            return queryset.filter(bonus__isnull=True)


@admin.register(Payment)
class PaymentAdmin(CommonIdModelAdmin):
    list_display = (
        *CommonIdModelAdmin.list_display,
        'student',
        'paid_for_lessons',
        'amount',
        'bonus',
        'group_of_course',
        'order_time',
        'valid_until',
        'get_first_data_payment',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'student',
        'paid_for_lessons',
        'bonus',
        'group_of_course',
        'valid_until',

        'payment',
        'amount',
        'order',
        'order_time',
        'first_payment',
    )
    search_fields = (
        'student__user__last_name',
        'bonus__user__last_name',
    )
    list_filter = (
        'group_of_course',
        BonusLesson,
    )
    # readonly_fields = (
    #     'payment',
    #     'amount',
    #     'order',
    #     'order_time',
    # )
    save_on_top = False


@admin.register(Promo)
class PromoAdmin(CommonIdModelAdmin):
    list_display = (
        *CommonIdModelAdmin.list_display,
        'code',
        'description',
        'discount',
        'order_time',
        'valid_until',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'code',
        'description',
        'discount',
        'order_time',
        'valid_until',
    )
    save_on_top = False
