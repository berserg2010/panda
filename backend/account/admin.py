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
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'user',
        'gender',
    )

    def get_full_name(self, obj):
        return obj.user.get_full_name()
    get_full_name.short_description = 'И.Ф.'


@admin.register(Teacher)
class TeacherAdmin(AccountAdmin):

    fields = (
        *AccountAdmin.fields,
        'native_speaker',
    )
    save_on_top = False


@admin.register(Student)
class StudentAdmin(AccountAdmin):

    fields = (
        *AccountAdmin.fields,
        'phone',
        'native_language',
        'age',
        'timezone',
        'accent_of_voice_acting',
        'system_notification',
        'support_message',
        'payment_info',
        'reminders_about_lessons',
        'discounts',
        'voice_acting',
        'pronunciation',
        'sounds',
    )


@admin.register(Payment)
class PaymentAdmin(CommonIdModelAdmin):

    list_display = (
        *CommonIdModelAdmin.list_display,
        'student',
        'paid_for_lessons',
        'bonus',
        'group_of_courses',
        'valid_until',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'student',
        'paid_for_lessons',
        'bonus',
        'group_of_courses',
        'valid_until',

        'payment',
        'amount',
        'order',
        'order_time',
    )
    readonly_fields = (
        'payment',
        'amount',
        'order',
        'order_time',
    )
    save_on_top = False
