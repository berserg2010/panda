from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from pydantic import BaseModel
from typing import Optional
from datetime import time

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


def schedule_entity_adapter(schedules, weeks):

    if schedules:
        for schedule in schedules:

            dt = schedule.datetime
            week_dt = dt.isocalendar()[1]
            weekday_dt = dt.isocalendar()[2]
            
            title = ''
            teacher = None
            student = None

            if isinstance(schedule, Schedule):
                title = schedule.paid_course.course.title
                teacher = schedule.paid_course.teacher
                student = schedule.paid_course.student

            if isinstance(schedule, FreeLesson):
                title = 'Бесплатное занятие'
                teacher = schedule.teacher
                student = schedule.student

            schedule_entity = ScheduleEntity(
                finished=schedule.finished,
                time=dt.time(),
                title=title,
                teacher=teacher,
                student=student,
            )

            weekdays = weeks.get(week_dt)

            if weekdays and weekdays.get(weekday_dt):
                weeks[week_dt][weekday_dt]['schedule'] += [schedule_entity]
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
            get_user_context(self),
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
