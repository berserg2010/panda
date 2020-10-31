from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import ProcessFormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse
from django.db.models import Prefetch, Q
import math

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from django.utils import timezone

now = timezone.now()

from .models import Course, CourseLesson, Schedule


class ScheduleEntity(BaseModel):
    status: bool
    date_value: datetime
    course: str
    student: str


class WeekDay(BaseModel):
    title: str
    date: datetime
    shedules: List[ScheduleEntity] = []


class Week(BaseModel):
    title: str
    week_days: List[WeekDay]


title_weeks = {
    0: 'Первая неделя',
    1: 'Вторая неделя',
    2: 'Третья неделя',
    3: 'Четвертая неделя',
    4: 'Пятая неделя',
    5: 'Шестая неделя',
    6: 'Седьмая неделя',
}

title_week_days = {
    0: 'Понедельник',
    1: 'Вториник',
    2: 'Среда',
    3: 'Четверг',
    4: 'Пятница',
    5: 'Суббота',
    6: 'Воскресенье',
}


def week_day_maker(dt, shedules):
    return WeekDay(title=title_week_days.get(dt.weekday()), date=dt, shedules=[
        ScheduleEntity(status=True if shedule.datetime >= now else False, date_value=shedule.datetime,
                       # course=shedule.course.banner_of_course.title,
                       student='{} {}'.format(shedule.course.student.user.first_name,
                                              shedule.course.student.user.last_name)) for
        shedule in shedules.filter(datetime__day=dt.day, datetime__month=dt.month, datetime__year=dt.year)])


def week_maker(week_number, first_day, shedules):
    if week_number == 0:
        week_days = [week_day_maker((first_day + timedelta(days=d)), shedules) for d in range(0, 7)]
    else:
        week_days = [week_day_maker((first_day + timedelta(days=d)), shedules) for d in
                     range((week_number * 7), ((week_number * 7) + 7))]

    return Week(title=title_weeks.get(week_number), week_days=week_days)


class TimetablesView(LoginRequiredMixin, ListView):
    model = Course
    template_name = 'private/timetables.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)

        user = self.request.user
        check_user = user.teacher if user.is_staff else user.student

        shedules = Schedule.objects.filter(
            course_id__in=[course.id for course in check_user.course_set.all()]).order_by('datetime')

        first_shedule = shedules.first()
        last_shedule = shedules.last()

        result_date = last_shedule.datetime - first_shedule.datetime

        weeks = [week_maker(i, first_shedule.datetime, shedules) for i in
                 range(0, int(math.ceil(result_date.days / 7)))]

        ctx['weeks'] = weeks
        return ctx

    def get_queryset(self):
        return super().get_queryset().filter(
            student__user=self.request.user,
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
