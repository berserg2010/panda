from datetime import time
import json
from pydantic import BaseModel
from typing import Union, Optional

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.utils import timezone
from django.views.generic import TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from common.utils import (
    date_now,
    get_user_context,
    message_success,
    message_error,
)
from account.models import Teacher, Student
from account.services.mail import send_mail_reschedule_lesson
from paid_course.models import FreeLesson, PaidCourse, Schedule, LessonResults


class ScheduleEntity(BaseModel):
    finished: bool
    time: time
    title: str = ''
    teacher: Optional[Teacher] = None
    student: Student
    lesson: Union[Schedule, FreeLesson]

    class Config:
        arbitrary_types_allowed = True


def schedule_entity_adapter(schedules, weeks):

    if schedules:
        for schedule in schedules:

            dt = schedule.datetime.astimezone()
            week_dt = dt.isocalendar()[1]
            weekday_dt = dt.isocalendar()[2]
            
            title = ''
            teacher = schedule.teacher
            student = schedule.student

            if isinstance(schedule, Schedule):
                title = schedule.paid_course.course.title

            if isinstance(schedule, FreeLesson):
                title = schedule._meta.verbose_name

            schedule_entity = ScheduleEntity(
                finished=schedule.finished,
                time=dt.time(),
                title=title,
                teacher=teacher,
                student=student,
                lesson=schedule,
            )

            weekdays = weeks.get(week_dt)

            if weekdays and weekdays.get(weekday_dt):
                weekday = weeks[week_dt][weekday_dt]
                weekday['schedule'] += [schedule_entity]
                sorted_weekday = sorted(weekday['schedule'], key=lambda x: x.time)
                weeks[week_dt][weekday_dt]['schedule'] = sorted_weekday

            elif weekdays:
                weeks[week_dt][weekday_dt] = {'date': dt.date(), 'schedule': [schedule_entity]}
            else:
                weeks[week_dt] = {weekday_dt: {'date': dt.date(), 'schedule': [schedule_entity]}}

    return weeks


class TimetablesView(LoginRequiredMixin, TemplateView):

    template_name = 'private/timetables.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        context['weeks'] = {}

        user = self.request.user

        today_start = date_now

        free_lessons = FreeLesson.objects.filter(
            get_user_context(self.request),
            datetime__gte=today_start,
        )

        schedules = Schedule.objects.filter(
            Q(paid_course__teacher__user=user) if user.is_staff else Q(paid_course__student__user=user),
            datetime__gte=today_start,
        )

        weeks = {}

        weeks = schedule_entity_adapter(schedules, weeks)
        weeks = schedule_entity_adapter(free_lessons, weeks)

        context['weeks'] = weeks

        return context


@login_required
def reschedule_lesson(request):
    message = message_error('Отменить занятие можно за 8 часов до начала.')

    if request.method == 'POST':

        data = json.loads(request.body)

        class_name = data.get('class_name')
        obj_id = data.get('obj_id')

        condition = class_name == Schedule.__name__
        if condition:
            lesson = Schedule.objects.get(pk=obj_id)
        else:
            lesson = FreeLesson.objects.get(pk=obj_id)

        if lesson.datetime >= date_now - timezone.timedelta(hours=8):
            send_mail_reschedule_lesson(lesson)
            message = message_success('Вы отправили заявку.')

    return JsonResponse(message)


class LessonsListView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/lessons.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self.request), finished=False)


class LessonDetailView(LoginRequiredMixin, DetailView):
    model = LessonResults
    template_name = 'private/lesson.html'


class NotesListView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/notes.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self.request),
        ).exclude(
            paid_course_lessons__note='',
        )


class VocabularyListView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self.request))


class VocabularyDetailView(LoginRequiredMixin, DetailView):
    model = LessonResults
    template_name = 'private/vocabulary_detail.html'
