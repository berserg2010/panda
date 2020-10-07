from django.contrib import admin

from .models import Teacher, Student, Wallet


@admin.register(Teacher, Student, Wallet)
class AccountAdmin(admin.ModelAdmin):

    pass
