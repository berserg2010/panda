from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from paid_course.services.paid_course import get_courses_stat
from paid_course.services.trial_lesson import get_trial_lessons
from account.models import Payment
from paid_course.models import PaidCourse
from paid_course.services.timetables import get_timetables


class IndexLkView(LoginRequiredMixin, TemplateView):
    template_name = 'private/index.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        user = self.request.user

        if user.is_staff:
            context['timetable'] = []

            timetable = get_timetables(self.request, one_day=True)
            context['timetable'] = timetable
        else:
            groups_courses_stat = get_courses_stat(user)
            context['groups_courses_stat'] = groups_courses_stat

            free_lessons = get_trial_lessons(self)
            context['free_lessons'] = free_lessons

        return context


class FreeLessonView(LoginRequiredMixin, TemplateView):
    template_name = 'private/free_lesson.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        user = self.request.user

        context['payment_bonuses'] = Payment.objects.filter(
            student=user.student,
            bonus__isnull=False,
        )

        return context


class StudentsListView(LoginRequiredMixin, TemplateView):
    template_name = 'private/students_list.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        user = self.request.user

        students_paid_courses = PaidCourse.objects.filter(
            teacher__user=user,
            finished=False,
        )
        context['current_courses'] = students_paid_courses

        return context
