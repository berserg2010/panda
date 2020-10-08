from django.contrib import admin

from .models import BannerOfCourse, NumberOfLessons, Course, CourseLesson, Schedule


@admin.register(BannerOfCourse, CourseLesson, NumberOfLessons)
class CourseAdmin(admin.ModelAdmin):

    pass


class ScheduleInline(admin.StackedInline):

    model = Schedule
    extra = 0


@admin.register(Course)
class CustomCourseAdmin(admin.ModelAdmin):

    inlines = (ScheduleInline, )

