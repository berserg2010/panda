from django.db.models import Q, Sum
from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from common.utils import date_now
from private_side.services.context import get_free_lessons
from account.models import Payment
from paid_course.models import PaidCourse, Schedule


class IndexLkView(LoginRequiredMixin, TemplateView):

    template_name = 'private/index.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        user = self.request.user

        if not user.is_staff:

            groups_courses_stat = []
            student = user.student

            last_payment_qs = student.get_payment_student.filter(valid_until__gte=date_now)

            for last_payment_inst in last_payment_qs.order_by(
                    'group_of_course__pk', '-valid_until'
            ).distinct('group_of_course'):

                last_payment = last_payment_qs.filter(
                    group_of_course=last_payment_inst.group_of_course
                ).first()

                print(
                    last_payment.paid_for_lessons,
                    last_payment.order_time,
                    last_payment.group_of_course,
                    last_payment.first_payment,
                )

                condition = last_payment is not None and last_payment.first_payment is not None
                if condition:
                    order_time = last_payment.first_payment.order_time
                    combine_filter = Q(
                        Q(order_time__gte=order_time) | Q(valid_until__gte=date_now),
                    )
                    active_payments = last_payment_qs.filter(combine_filter).order_by('valid_until')

                elif last_payment is not None:
                    order_time = last_payment.order_time
                    active_payments = last_payment_qs.filter(pk=last_payment.pk)

                else:
                    order_time = ''
                    active_payments = Payment.objects.none()

                group_courses_stat = {
                    'title': '',
                    'lessons': 0,
                    'bonus': 0,
                    'valid_until': '',
                }

                title = last_payment_inst.group_of_course.title
                paid_filter = Q(group_of_course=last_payment_inst.group_of_course)
                lessons = active_payments.filter(paid_filter).aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)
                bonus = active_payments.filter(paid_filter & Q(bonus__isnull=False))

                if bonus:
                    bonus = bonus.aggregate(Sum('paid_for_lessons')).get('paid_for_lessons__sum', 0)
                else:
                    bonus = 0

                valid_until = active_payments.filter(paid_filter).latest('valid_until').valid_until

                schedule = Schedule.get_student_schedule(
                    student,
                    last_payment_inst.group_of_course,
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

            context['free_lessons'] = get_free_lessons(self)

        return context


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
