from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils import timezone
from django.db.models import Q
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta
import math

from common.utils import date_now
from paid_course.models import PaidCourse, Schedule, LessonResults


title_weeks = {
    0: 'Первая неделя',
    1: 'Вторая неделя',
    2: 'Третья неделя',
    3: 'Четвертая неделя',
    4: 'Пятая неделя',
    5: 'Шестая неделя',
    6: 'Седьмая неделя',
}
title_weekday = {
    0: 'Понедельник',
    1: 'Вториник',
    2: 'Среда',
    3: 'Четверг',
    4: 'Пятница',
    5: 'Суббота',
    6: 'Воскресенье',
}


class ScheduleEntity(BaseModel):
    finished: bool
    datetime: datetime
    paid_course: str = ''
    teacher: str = ''
    student: str = ''
    free_lesson: bool = False


class WeekDay(BaseModel):
    title: str
    date: datetime
    schedules: List[ScheduleEntity] = []


class Week(BaseModel):
    title: str
    weekday: List[WeekDay]


def weekday_maker(dt, schedules):
    return WeekDay(
        title=title_weekday.get(dt.weekday()),
        date=dt,
        schedules=[
            ScheduleEntity(
                finished=True if (schedule.datetime >= date_now) else False,
                datetime=schedule.datetime,
                paid_course=schedule.paid_course.course.title,
                # lesson=schedule.paid_course.lessons.all()[key].title,
                teacher=schedule.paid_course.teacher.user.get_full_name(),
                student=schedule.paid_course.student.user.get_full_name(),
            ) for key, schedule in enumerate(schedules.filter(datetime__day=dt.day, datetime__month=dt.month, datetime__year=dt.year))
        ]
    )


def week_maker(week_number, first_day, schedules):

    weekday = [
        weekday_maker((first_day + timedelta(days=d)), schedules)
        for d in range((week_number * 7), ((week_number * 7) + 7))
    ]

    return Week(
        title=title_weeks.get(week_number),
        weekday=weekday
    )


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
        object_list = context.get('object_list')

        schedules = Schedule.objects.filter(
            paid_course_id__in=object_list.values_list('id', flat=True)
        )

        if schedules:
            first_schedule = schedules.first()
            last_schedule = schedules.last()

            date_delta = last_schedule.datetime - first_schedule.datetime

            context['weeks'] = [
                week_maker(i, first_schedule.datetime, schedules)
                for i in range(int(math.ceil(date_delta.days / 7)))
            ]
        else:
            context['weeks'] = None

        return context

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self),
            finished=False,
        )


class PaidCourseListView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/lessons.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self), finished=False)


class PaidCourseLessonView(LoginRequiredMixin, DetailView):

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
