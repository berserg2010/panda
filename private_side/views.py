from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class IndexLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/index.html'


class SettingsLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/settings.html'


class FreeLessonLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/free-lesson.html'
