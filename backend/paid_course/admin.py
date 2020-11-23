from django.contrib import admin

from common.utils import hardware_inline, CommonIdModelAdmin, CommonFieldsModelAdmin
from paid_course.models import (
    Schedule,
    FreeLesson,
    PaidCourse,
    LessonResults,
)


@hardware_inline(Schedule)
class ScheduleInline(admin.StackedInline):
    pass


@admin.register(FreeLesson)
class FreeLessonAdmin(CommonIdModelAdmin):

    list_display = (
        'student',
        'teacher',
        'datetime',
        'finished',
    )
    list_display_links = ('student', )
    fields = (
        *CommonIdModelAdmin.fields,
        'student',
        'teacher',
        'datetime',
        'finished',
    )
    search_fields = (
        'student',
    )
    save_on_top = False


@admin.register(PaidCourse)
class PaidCourseAdmin(CommonIdModelAdmin):

    list_display = (
        'course',
        'student',
        'teacher',
        'finished',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'course',
        'student',
        'teacher',
        'finished',
    )
    search_fields = (
        'student',
    )
    inlines = (ScheduleInline, )
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
