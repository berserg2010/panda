from django.contrib import admin

from .models import Lesson, Homework


@admin.register(Lesson, Homework)
class LessonAdmin(admin.ModelAdmin):

    pass
