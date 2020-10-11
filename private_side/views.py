from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from course.models import Course


class IndexLkView(LoginRequiredMixin, ListView):

    model = Course
    template_name = 'private/index.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            student__user=self.request.user,
            finished=False,
        )


class SettingsLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/settings.html'


class FreeLessonLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/free_lesson.html'
