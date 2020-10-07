from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView

from .models import BannerOfCourse


class CoursesListView(ListView):

    model = BannerOfCourse
    template_name = 'private/courses.html'


class ChoiceCourseView(DetailView):

    model = BannerOfCourse
    template_name = 'private/course_detail.html'
