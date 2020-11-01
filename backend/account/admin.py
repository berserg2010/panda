from django.contrib import admin

from common.utils import CommonIdModelAdmin, CommonFieldsModelAdmin
from .models import Teacher, Student, Wallet


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
        'wallet',
    )


@admin.register(Wallet)
class WalletAdmin(CommonIdModelAdmin):

    list_display = (
        'id',
        'get_student_name',
    )
    save_on_top = False

    def get_student_name(self, obj):
        return obj.student.user.get_full_name()
    get_student_name.short_description = 'И.Ф.'
