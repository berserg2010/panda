from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import ProcessFormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse
from django.db.models import Q
import math
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from django.utils import timezone
import uuid

from account.models import Teacher, Student
from .models import Course, CourseLesson, PaidCourse, Schedule


def get_user_context(obj, is_filter=True):
    user = obj.request.user
    if is_filter:
        return Q(teacher__user=user) if user.is_staff else Q(student__user=user)
    else:
        return user.teacher if user.is_staff else user.student


now = timezone.now()


class ScheduleEntity(BaseModel):
    status: bool
    date_value: datetime
    course: str = ''
    lesson: str = ''
    teacher: str = ''
    student: str = ''


class WeekDay(BaseModel):
    title: str
    date: datetime
    schedules: List[ScheduleEntity] = []


class Week(BaseModel):
    title: str
    weekday: List[WeekDay]


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


def weekday_maker(dt, schedules):
    return WeekDay(
        title=title_weekday.get(dt.weekday()),
        date=dt,
        schedules=[
            ScheduleEntity(
                status=True if (schedule.datetime >= now) else False,
                date_value=schedule.datetime,
                course=schedule.course.course.title,
                lesson=schedule.course.lessons.all()[key].title,
                teacher=schedule.course.teacher.user.get_full_name(),
                student=schedule.course.student.user.get_full_name(),
            ) for key, schedule in enumerate(schedules.filter(datetime__day=dt.day, datetime__month=dt.month, datetime__year=dt.year))
        ]
    )


def week_maker(week_number, first_day, schedules):

    # if week_number:
    #     weekday = [
    #         weekday_maker((first_day + timedelta(days=d)), schedules)
    #         for d in range(0, 7)
    #     ]
    # else:
    weekday = [
        weekday_maker((first_day + timedelta(days=d)), schedules)
        for d in range((week_number * 7), ((week_number * 7) + 7))
    ]

    return Week(
        title=title_weeks.get(week_number),
        weekday=weekday
    )


class TimetablesView(LoginRequiredMixin, ListView):

    model = PaidCourse
    template_name = 'private/timetables.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)

        schedules = Schedule.objects.filter(
            course_id__in=[
                paid_course.id
                for paid_course in get_user_context(self, is_filter=False).paidcourse_set.filter(finished=False)
            ]
        ).order_by('datetime')

        first_schedule = schedules.first()
        last_schedule = schedules.last()

        date_delta = last_schedule.datetime - first_schedule.datetime

        print(first_schedule.datetime)
        print(last_schedule.datetime)
        print(date_delta)

        ctx['weeks'] = [
            week_maker(i, first_schedule.datetime, schedules)
            for i in range(0, int(math.ceil(date_delta.days / 7)))
        ]

        return ctx

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self),
            finished=False,
        )


class CourseListView(LoginRequiredMixin, ListView):
    model = Course
    template_name = 'private/courses.html'


class CourseDetailView(LoginRequiredMixin, DetailView):
    model = Course
    template_name = 'private/course_detail.html'


class CourseLessonListView(LoginRequiredMixin, ListView):
    model = Course
    template_name = 'private/lessons.html'

    def get_queryset(self):
        user = self.request.user
        user_filter = Q(teacher__user=user) if user.is_staff else Q(student__user=user)

        return super().get_queryset().filter(user_filter, finished=False)
        #     .prefetch_related(
        #     Prefetch('lessons')
        # )


class LessonView(LoginRequiredMixin, DetailView):
    model = CourseLesson
    template_name = 'private/lesson.html'

    def get_queryset(self):
        user = self.request.user
        user_filter = Q(course__teacher__user=user) if user.is_staff else Q(course__student__user=user)

        return super().get_queryset().filter(user_filter, course__finished=False)


class NotesListView(ListView):
    model = CourseLesson
    template_name = 'private/notes.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class VocabularyListView(LoginRequiredMixin, ListView):
    model = CourseLesson
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class VocabularyDetailView(LoginRequiredMixin, DetailView):
    model = CourseLesson
    template_name = 'private/vocabulary_detail.html'


class TestsCoursesListView(LoginRequiredMixin, ListView):
    model = CourseLesson
    template_name = 'private/tests_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class TestsCourseLessonListView(LoginRequiredMixin, DetailView, ProcessFormView):
    model = CourseLesson
    template_name = 'private/test_detail.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )

    def post(self, request, *args, **kwargs):

        result = {key: value for key, value in request.POST.items() if key != 'csrfmiddlewaretoken'}
        course_lesson = self.get_object()
        tests = course_lesson.lesson.homework_tests.all()
        count_tests = tests.count()

        sum_true_result = 0

        for key, value in result.items():

            if tests.get(pk=int(key)).answer == value:
                sum_true_result += 1

        course_lesson.test_result = sum_true_result / count_tests
        course_lesson.save()

        return redirect(reverse('private_side:tests_courses_list'))


class TasksView(LoginRequiredMixin, TemplateView):
    template_name = 'private/tasks.html'
