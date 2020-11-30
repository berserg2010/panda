import pytest
from django.urls import reverse
from django.utils import timezone
from mixer.backend.django import mixer
from rest_framework.status import HTTP_200_OK
from datetime import datetime
from pytz import timezone as tz

from .conftest import ParameterStorage
from course.models import GroupsOfCourses, PackageOfLessons, Course
from ..models import FreeLesson, PaidCourse, Schedule, LessonResults
from ..views import ScheduleEntity


pytestmark = pytest.mark.django_db


@pytest.mark.usefixtures('create_student')
class TestTimetablesView:

    def test_revers_url(self, student_register):
        res = student_register.get(reverse('private_side:timetables'))
        assert res.status_code == HTTP_200_OK

    def test_context_student(self, student_register, create_course,
                             create_free_lesson, create_paid_course, create_schedule):

        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK
        assert res.context['weeks'] == {}

        user = res.context['user']

        start_dt = timezone.now()
        week_1 = start_dt.isocalendar()[1]
        day_1 = start_dt.isocalendar()[2]

        td_2_hours_dt = start_dt + timezone.timedelta(hours=2)

        td_1_day_dt = start_dt + timezone.timedelta(days=1)
        day_2 = td_1_day_dt.isocalendar()[2]

        td_8_days_dt = start_dt + timezone.timedelta(days=8)
        week_2 = td_8_days_dt.isocalendar()[1]
        day_3 = td_8_days_dt.isocalendar()[2]

        free_lesson = create_free_lesson(user.student, start_dt)
        assert FreeLesson.objects.count() == 1

        result_data_free_lesson = {
            week_1: {
                day_1: {
                    'date': start_dt.date(),
                    'schedule': [
                        ParameterStorage.free_lesson_data(free_lesson, start_dt),
                    ]
                },
            },
        }
        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK
        assert res.context['weeks'] == result_data_free_lesson

        course = create_course(is_published=True)
        assert Course.objects.count() == 1

        paid_course = create_paid_course(user.student, course)
        assert PaidCourse.objects.count() == 1

        schedule_2_hours = create_schedule(paid_course, td_2_hours_dt)
        schedule_1_day = create_schedule(paid_course, td_1_day_dt)
        schedule_8_days = create_schedule(paid_course, td_8_days_dt)

        result_data = {
            week_1: {
                day_1: {
                    'date': start_dt.date(),
                    'schedule': [
                        ParameterStorage.schedule_data(schedule_2_hours, td_2_hours_dt),
                        ParameterStorage.free_lesson_data(free_lesson, start_dt),
                    ],
                },
                day_2: {
                    'date': td_1_day_dt.date(),
                    'schedule': [
                        ParameterStorage.schedule_data(schedule_1_day, td_1_day_dt),
                    ],
                },
            },
            week_2: {
                day_3: {
                    'date': td_8_days_dt.date(),
                    'schedule': [
                        ParameterStorage.schedule_data(schedule_8_days, td_8_days_dt),
                    ],
                },
            },
        }

        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK
        assert res.context['weeks'] == result_data
