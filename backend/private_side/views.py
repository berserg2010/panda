from django.db.models import Q
from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect

from common.utils import date_now
from account.models import Payment
from paid_course.models import PaidCourse


class IndexLkView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user

        student_filter = Q(Q(student=user.student) | Q(bonus=user.student))

        if not user.is_staff:
            payment = Payment.objects.filter(
                student_filter,
                valid_until__gte=date_now,
            )

            context['payment'] = payment

            context['payment_groups_of_courses'] = payment.distinct(
                'group_of_courses'
            )

            # context['payment_bonus'] = payment.filter(
            #     bonus__isnull=False,
            # )

        return context


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
