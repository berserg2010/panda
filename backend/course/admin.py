from django.contrib import admin

from common.utils import hardware_inline, CommonIdModelAdmin, CommonFieldsModelAdmin
from .models import (
    Course,
    NumberOfLessons,
    Level,
    CourseLesson,
    Schedule,
    PaidCourse,
    PaidCourseLesson,
)


@hardware_inline(Course)
class CourseInline(admin.TabularInline):
    pass


@hardware_inline(Schedule)
class ScheduleInline(admin.StackedInline):
    pass


@admin.register(Course)
class CourseAdmin(CommonFieldsModelAdmin):

    list_display = (
        *CommonFieldsModelAdmin.list_display,
        'cost',
        'get_cost_with_discount',
        'percentage_discount',
        'get_discount',
    )
    fields = (
        *CommonFieldsModelAdmin.fields,
        'number_of_lessons',
        'percentage_discount',
        'cost',
    )
    search_fields = (
        'title',
    )
    save_on_top = False


@admin.register(NumberOfLessons)
class NumberOfLessonsAdmin(admin.ModelAdmin):
    pass


@admin.register(Level)
class CourseLessonAdmin(CommonFieldsModelAdmin):
    save_on_top = False


@admin.register(CourseLesson)
class CourseLessonAdmin(CommonIdModelAdmin):

    list_display = (
        'number',
        'lesson',
        'course',
        'level',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'number',
        'lesson',
        'course',
        'level',
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
        'student', 'teacher',
        'finished', 'course',
    )
    search_fields = (
        'student',
    )
    inlines = (ScheduleInline, )
    save_on_top = False


@admin.register(PaidCourseLesson)
class PaidCourseLessonAdmin(CommonIdModelAdmin):

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
