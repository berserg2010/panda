from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.db.models import Prefetch, Q

from .models import BannerOfCourse, Course, CourseLesson


class BannerOfCourseListView(ListView):

    model = BannerOfCourse
    template_name = 'private/courses.html'


class BannerOfCourseDetailView(DetailView):

    model = BannerOfCourse
    template_name = 'private/course_detail.html'


class CourseLessonListView(ListView):

    model = Course
    template_name = 'private/lessons.html'

    def get_queryset(self):

        user = self.request.user
        user_filter = Q(teacher__user=self.request.user) if user.is_staff else Q(student__user=self.request.user)

        return super().get_queryset().filter(user_filter).prefetch_related(
            Prefetch('lessons')
        )

class LessonView(DetailView):

    model = CourseLesson
    template_name = 'private/lesson.html'
