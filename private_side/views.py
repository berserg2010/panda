from django.db.models import Q
from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from course.models import PaidCourse
from account.models import Student


class IndexLkView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/index.html'

    def get_queryset(self):

        user = self.request.user
        user_filter = Q(teacher__user=user) if user.is_staff else Q(student__user=user)

        return super().get_queryset().filter(
            user_filter,
            finished=False,
        )


class SettingsLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/settings.html'


class FreeLessonLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/free_lesson.html'


class StudentsListView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/students_list.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            teacher__user=self.request.user,
            finished=False,
        )
