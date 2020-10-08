from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.db.models import Prefetch

from .models import BannerOfCourse, Course


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
        return super().get_queryset().filter(student__user=self.request.user).prefetch_related(
            Prefetch('lessons')
        )
