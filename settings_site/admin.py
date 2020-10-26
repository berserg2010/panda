from django.contrib import admin

from .models import SettingsSite


class SettingsSiteAdmin(admin.ModelAdmin):

    list_select_related = False
    preserve_filters = False


@admin.register(SettingsSite)
class LessonAdmin(SettingsSiteAdmin):

    pass
