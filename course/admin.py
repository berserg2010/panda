from django.contrib import admin

from .models import BannerOfCourse, Course, CourseLesson


@admin.register(BannerOfCourse, Course, CourseLesson)
class CourseAdmin(admin.ModelAdmin):

    pass
