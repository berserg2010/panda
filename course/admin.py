from django.contrib import admin

from common.utils import hardware_inline
from .models import Course, CourseLesson, Schedule, PersonalCourse, PersonalCourseLesson


@hardware_inline(Course)
class CourseInline(admin.TabularInline):
    pass


@hardware_inline(Schedule)
class ScheduleInline(admin.StackedInline):
    pass


class CustomModelAdmin(admin.ModelAdmin):

    # list_display_links = ("description",)
    # list_filter = ["manufacturer"]
    list_select_related = False
    preserve_filters = False
    save_on_top = True
    # search_fields = ["inventory_number", "description"]
    # exclude = ("workstation", )
    readonly_fields = ('id', )


    # def get_list_workstations(self, obj):
    #     instance = obj.workstation_set.filter()
    #     if instance.exists():
    #         return [*instance]
    #     else:
    #         return []
    # get_list_workstations.short_description = "Рабочая станция"


@admin.register(Course)
class CourseAdmin(CustomModelAdmin):

    list_display = (
        'title',
        'cost',
        'get_cost_with_discount',
        'percentage_discount',
        'get_discount',
    )
    search_fields = (
        'title',
    )
    fields = (
        'id', 'title', 'description', 'number_of_lessons',
        'percentage_discount', 'cost',
    )
    # inlines = (ScheduleInline, )


@admin.register(CourseLesson)
class CourseLessonAdmin(CustomModelAdmin):
    pass


@admin.register(PersonalCourse)
class PersonalCourseAdmin(CustomModelAdmin):

    list_display = (
        'course',
    )
    # date_hierarchy = 'schedule_set'
    # fields = (*Motherboard._list_fields(), )
    # inlines = (ScheduleInline, )


@admin.register(PersonalCourseLesson)
class PersonalCourseLessonAdmin(CustomModelAdmin):
    pass
