from django.contrib import admin

from common.utils import hardware_inline, CommonIdModelAdmin, CommonFieldsModelAdmin
from course.models import (
    GroupsOfCourses,
    Course,
    PackageOfLessons,
    Level,
    CourseLesson,
)


@hardware_inline(Course)
class CourseInline(admin.TabularInline):
    pass


@admin.register(GroupsOfCourses)
class GroupsOfCoursesAdmin(CommonFieldsModelAdmin):

    save_on_top = False


@admin.register(PackageOfLessons)
class PackageOfLessonsAdmin(admin.ModelAdmin):

    list_display = (
        'count',
        'cost',
    )
    save_on_top = False


@admin.register(Course)
class CourseAdmin(CommonFieldsModelAdmin):

    list_display = (
        *CommonFieldsModelAdmin.list_display,
    )
    fields = (
        *CommonFieldsModelAdmin.fields,
        'package_of_lessons',
        'group_of_course',
        'is_published',
        'image',
    )
    search_fields = (
        'title',
    )
    save_on_top = False


@admin.register(Level)
class LevelAdmin(CommonFieldsModelAdmin):
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
