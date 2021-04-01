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
        'teacher',
        'student',
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


def get_course_title(self):
    if isinstance(self, Schedule):
        return self.paid_course.course.title
    else:
        return 'Пробное заняние'
get_course_title.short_description = 'расписание по курсу'


@admin.register(FreeLesson)
class FreeLessonAdmin(BaseLessonAdmin):
    list_display = (
        get_course_title,
        *BaseLessonAdmin.list_display,
        'datetime',
    )
    search_fields = (
        'student__user__last_name',
        'teacher__user__last_name',
    )
    date_hierarchy = 'datetime'
    ordering = ('datetime', )
    list_filter = (
        'finished',
        'datetime',
    )
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


def get_teacher(self):
    return self.paid_course.teacher
get_teacher.short_description = 'учитель'


def get_student(self):
    return self.paid_course.student
get_student.short_description = 'ученик'


@admin.register(Schedule)
class ScheduleAdmin(CommonIdModelAdmin):
    list_display = (
        get_course_title,
        get_teacher,
        get_student,
        'finished',
        'datetime',
    )
    search_fields = (
        'paid_course__student__user__last_name',
        'paid_course__teacher__user__last_name',
    )
    list_filter = (
        'finished',
        'datetime',
    )
    date_hierarchy = 'datetime'
    fields = (
        *CommonIdModelAdmin.fields,
        'paid_course',
        'finished',
        'datetime',
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
