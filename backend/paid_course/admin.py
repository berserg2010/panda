from django.contrib import admin

from common.utils import base_inline, CommonIdModelAdmin
from paid_course.models import (
    Schedule,
    FreeLesson,
    PaidCourse,
    LessonResults,
)


@base_inline(Schedule)
class ScheduleInline(admin.StackedInline):
    pass


class BaseLessonAdmin(CommonIdModelAdmin):
    list_display = (
        'student',
        'teacher',
        'finished',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'student',
        'teacher',
        'finished',
    )
    search_fields = (
        'student__user__last_name',
    )
    save_on_top = False


@admin.register(FreeLesson)
class FreeLessonAdmin(BaseLessonAdmin):
    list_display = (
        *BaseLessonAdmin.list_display,
        'datetime',
    )
    list_display_links = ('student', )
    fields = (
        *BaseLessonAdmin.fields,
        'datetime',
    )


@admin.register(PaidCourse)
class PaidCourseAdmin(BaseLessonAdmin):
    list_display = (
        *BaseLessonAdmin.list_display,
        'course',
    )
    fields = (
        *BaseLessonAdmin.fields,
        'course',
    )
    inlines = (ScheduleInline, )


@admin.register(Schedule)
class ScheduleAdmin(CommonIdModelAdmin):
    list_display = (
        'paid_course',
        'datetime',
        'finished',
    )
    search_fields = (
        'paid_course__student__user__last_name',
    )
    list_filter = ('datetime', 'finished', )
    fields = (
        *CommonIdModelAdmin.fields,
        'paid_course',
        'datetime',
        'finished',
    )
    save_on_top = False


@admin.register(LessonResults)
class LessonResultsAdmin(CommonIdModelAdmin):
    list_display = (
        'lesson',
        'course_lesson',
        'paid_course',
        'test_result',
        'word_result',
        'game_result',
        'finished',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'lesson',
        'course_lesson',
        'paid_course',
        'note',
        'test_result',
        'word_result',
        'game_result',
        'finished',
    )
