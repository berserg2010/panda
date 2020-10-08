from django.contrib import admin

from .models import Lesson, Test, Word, Example, Article, Book


class CommonAdmin(admin.ModelAdmin):

    list_select_related = False
    preserve_filters = False
    # save_on_top = True


@admin.register(Lesson, Test, Word, Example, Article, Book)
class LessonAdmin(CommonAdmin):

    pass
