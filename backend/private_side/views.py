from django.db.models import Q, Sum
from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from common.utils import date_now
from account.models import Payment
from paid_course.models import PaidCourse, Schedule


class IndexLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user

        if not user.is_staff:

            student = user.student

            last_payment = student.get_payment_student.filter(valid_until__gte=date_now).first()

            condition = last_payment is not None and last_payment.first_payment is not None
            if condition:

                order_time = last_payment.first_payment.order_time
                combine_filter = Q(
                    Q(student=student),
                    Q(order_time__gte=order_time)
                    | Q(valid_until__gte=date_now),
                )
                active_payments = Payment.objects.filter(combine_filter).order_by()

            elif last_payment is not None:
                order_time = last_payment.order_time
                active_payments = Payment.objects.filter(pk=last_payment.pk)
            else:
                order_time = ''
                active_payments = Payment.objects.none()

            groups_courses_stat = []

            for group_of_course in active_payments.order_by().distinct('group_of_course'):

                group_courses_stat = {
                    'title': '',
                    'lessons': 0,
                    'bonus': 0,
                    'valid_until': '',
                }

                paid_filter = Q(group_of_course=group_of_course.group_of_course)
                title = group_of_course.group_of_course.title
                lessons = active_payments.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)
                bonus = active_payments.filter(paid_filter & Q(bonus__isnull=False))

                if bonus:
                    bonus = bonus.aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)
                else:
                    bonus = 0

                valid_until = active_payments.filter(paid_filter).latest('valid_until').valid_until

                schedule = Schedule.get_student_schedule(
                    student,
                    group_of_course.group_of_course,
                    order_time
                ).count()

                bonus -= schedule
                lessons -= schedule

                group_courses_stat['title'] = title
                group_courses_stat['lessons'] = lessons if lessons > 0 else 0
                group_courses_stat['bonus'] = bonus if bonus > 0 else 0
                group_courses_stat['valid_until'] = valid_until

                groups_courses_stat.append(group_courses_stat)

            context['groups_courses_stat'] = groups_courses_stat

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

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        user = self.request.user

        context['payment_bonuses'] = Payment.objects.filter(
            student=user.student,
            bonus__isnull=False,
        )

        return context


class StudentsListView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/students_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            teacher__user=self.request.user,
            finished=False,
        )
