from django.contrib.auth import get_user_model
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils import timezone
from django.db.models import Q
from pydantic import BaseModel, PyObject
from typing import List, Optional
from datetime import datetime, timedelta, time
import math
from pytz import timezone as tz

from common.utils import date_now
from account.models import Teacher, Student
from paid_course.models import FreeLesson, PaidCourse, Schedule, LessonResults


class ScheduleEntity(BaseModel):
    finished: bool
    time: time
    title: str = ''
    teacher: Optional[Teacher] = None
    student: Student

    class Config:
        arbitrary_types_allowed = True


def get_user_context(obj, is_filter=True):
    user = obj.request.user
    if is_filter:
        return Q(teacher__user=user) if user.is_staff else Q(student__user=user)
    else:
        return user.teacher if user.is_staff else user.student


class TimetablesView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/timetables.html'

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        context['weeks'] = {}

        object_list = context.get('object_list')

        free_lessons = FreeLesson.objects.filter(
            get_user_context(self),
            finished=False,
        )

        finished_lessons_count = LessonResults.objects.filter(
            paid_course_id__in=object_list.values_list('id', flat=True)
        ).count()

        schedules = Schedule.objects.filter(
            paid_course_id__in=object_list.values_list('id', flat=True)
        )[finished_lessons_count:]

        weeks = {}

        if schedules:
            for schedule in schedules:

                dt = schedule.datetime
                week_dt = dt.isocalendar()[1]
                weekday_dt = dt.isocalendar()[2]

                schedule_entity = ScheduleEntity(
                    finished=schedule.paid_course.finished, # !!!
                    time=dt.time(),
                    title=schedule.paid_course.course.title,
                    teacher=schedule.paid_course.teacher,
                    student=schedule.paid_course.student,
                )

                weekdays = weeks.get(week_dt)

                if weekdays and weekdays.get(weekday_dt):
                    weeks[week_dt][weekday_dt]['schedule'] += [schedule_entity]
                elif weekdays:
                    weeks[week_dt][weekday_dt] = {'date': dt.date(), 'schedule': [schedule_entity]}
                else:
                    weeks[week_dt] = {weekday_dt: {'date': dt.date(), 'schedule': [schedule_entity]}}


        if free_lessons:
            for free_lesson in free_lessons:

                dt = free_lesson.datetime
                week_dt = dt.isocalendar()[1]
                weekday_dt = dt.isocalendar()[2]

                schedule_entity = ScheduleEntity(
                    finished=free_lesson.finished,
                    time=dt.time(),
                    title='Бесплатное занятие',
                    teacher=free_lesson.teacher,
                    student=free_lesson.student,
                )

                weekdays = weeks.get(week_dt)

                if weekdays and weekdays.get(weekday_dt):
                    weeks[week_dt][weekday_dt]['schedule'] += [schedule_entity]
                elif weekdays:
                    weeks[week_dt][weekday_dt] = {'date': dt.date(), 'schedule': [schedule_entity]}
                else:
                    weeks[week_dt] = {weekday_dt: {'date': dt.date(), 'schedule': [schedule_entity]}}

        context['weeks'] = weeks

        return context

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self),
            finished=False,
        )


class LessonsListView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/lessons.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self), finished=False)


class LessonDetailView(LoginRequiredMixin, DetailView):

    model = LessonResults
    template_name = 'private/lesson.html'


class NotesListView(ListView):

    model = PaidCourse
    template_name = 'private/notes.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self),
        ).exclude(
            paid_course_lessons__note='',
        )


class VocabularyListView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self))


class VocabularyDetailView(LoginRequiredMixin, DetailView):

    model = LessonResults
    template_name = 'private/vocabulary_detail.html'
