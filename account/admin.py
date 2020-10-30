from django.contrib import admin

from common.utils import CustomModelAdmin
from .models import Teacher, Student, Wallet


@admin.register(Teacher)
class TeacherAdmin(CustomModelAdmin):

    list_display = (
        'get_full_name',
    )
    fields = (
        *CustomModelAdmin.fields,
        'user',
        'gender',
        'native_speaker',
    )
    save_on_top = False

    def get_full_name(self, obj):
        return obj.user.get_full_name()
    get_full_name.short_description = 'И.Ф.'


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    pass


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    pass
