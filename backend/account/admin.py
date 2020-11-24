from django.contrib import admin

from common.utils import CommonIdModelAdmin
from .models import RequestUser, Teacher, Student, Payment


@admin.register(RequestUser)
class RequestUserAdmin(CommonIdModelAdmin):

    list_display = (
        *CommonIdModelAdmin.list_display,
        'name',
        'email',
        'phone',
        'sending_date',
        'check_date',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'name',
        'email',
        'phone',
        'sending_date',
        'check_date',
    )
    readonly_fields = ('sending_date', )
    save_on_top = False


class AccountAdmin(CommonIdModelAdmin):

    list_display = (
        'get_full_name',
        'get_email',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'user',
        'gender',
    )


@admin.register(Teacher)
class TeacherAdmin(AccountAdmin):

    fields = (
        *AccountAdmin.fields,
        'native_speaker',
    )
    save_on_top = False


@admin.register(Student)
class StudentAdmin(AccountAdmin):

    list_display = (
        *AccountAdmin.list_display,
        'phone',
        'age',
    )
    fields = (
        *AccountAdmin.fields,
        'phone',
        # 'native_language',
        'age',
        # 'timezone',
        # 'accent_of_voice_acting',
        # 'system_notification',
        # 'support_message',
        # 'payment_info',
        # 'reminders_about_lessons',
        # 'discounts',
        # 'voice_acting',
        # 'pronunciation',
        # 'sounds',
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
