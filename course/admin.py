from django.contrib import admin

from .models import BannerOfCourse, NumberOfLessons, Course, CourseLesson, Schedule


def hardware_inline(model):
    def wrapped(cls):

        cls.model = model
        cls.extra = 0

        return cls
    return wrapped


@hardware_inline(Course)
class CourseInline(admin.TabularInline):
    pass


class CustomListCoursesModelAdmin(admin.ModelAdmin):

    # list_display_links = ("description",)
    # list_display = ["get_list_workstations"]
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


@admin.register(BannerOfCourse, CourseLesson, NumberOfLessons)
class CourseAdmin(admin.ModelAdmin):

    inlines = [CourseInline, ]

class ScheduleInline(admin.StackedInline):

    model = Schedule
    extra = 0

@admin.register(Course)
class CoursedAdmin(CustomListCoursesModelAdmin):

    list_display = (
        'banner_of_course',
        'student',
        'teacher',
        'number_of_lessons',
        'finished',
    )
    # list_display = (
    #     *Motherboard._list_fields(),
    #     *CustomListWorkstationsModelAdmin.list_display,
    # )
    # fields = (*Motherboard._list_fields(), )
    inlines = (ScheduleInline, )





# @admin.register(Course)
# class CustomCourseAdmin(admin.ModelAdmin):
#
#     model = model
#     extra = 0
#
#     inlines = (ScheduleInline, )

