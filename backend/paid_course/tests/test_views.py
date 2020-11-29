import pytest
from django.urls import reverse
from django.utils import timezone
from mixer.backend.django import mixer
from rest_framework.status import HTTP_200_OK
from datetime import datetime
from pytz import timezone as tz

from course.models import GroupsOfCourses, PackageOfLessons, Course
from ..models import FreeLesson, PaidCourse, Schedule, LessonResults
from ..views import ScheduleEntity


pytestmark = pytest.mark.django_db


@pytest.mark.usefixtures('create_student')
class TestTimetablesView:

    def test_revers_url(self, student_register):
        res = student_register.get(reverse('private_side:timetables'))
        assert res.status_code == HTTP_200_OK


    def test_context_student(self, student_register):

        date_now = timezone.datetime(2020, 1, 1, 12, 00, tzinfo=tz('UTC'))

        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK

        context = res.context

        assert context['weeks'] == {}

        user = context['user']

        group_of_course = mixer.blend(GroupsOfCourses)
        package_of_lessons = mixer.blend(PackageOfLessons)
        course = mixer.blend(
            Course,
            is_published=True,
            group_of_course=group_of_course,
            package_of_lessons=package_of_lessons,
        )

        date_free_lesson = date_now + timezone.timedelta(days=1)

        free_lesson = mixer.blend(
            FreeLesson,
            finished=False,
            datetime=date_free_lesson,
            student=user.student,
        )
        assert FreeLesson.objects.count() == 1

        paid_course = mixer.blend(
            PaidCourse,
            finished=False,
            course=course,
            student=user.student,
        )
        assert PaidCourse.objects.count() == 1

        result_data = {
            date_free_lesson.isocalendar()[1]: {
                date_free_lesson.isocalendar()[2]: {
                    'date': date_free_lesson.date(),
                    'schedule': [
                        ScheduleEntity(
                            finished=free_lesson.finished,
                            time=date_free_lesson.time(),
                            title='Бесплатное занятие',
                            teacher=free_lesson.teacher,
                            student=free_lesson.student,
                        ),
                    ],
                },
            },
        }

        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK

        context = res.context

        assert context['weeks'] == result_data

        date_schedule_2_hours = date_free_lesson + timezone.timedelta(hours=2)
        schedule_2_hours = mixer.blend(
            Schedule,
            datetime=date_schedule_2_hours,
            paid_course=paid_course,
        )
        date_schedule_1_day = date_free_lesson + timezone.timedelta(days=1)
        schedule_1_day = mixer.blend(
            Schedule,
            datetime=date_schedule_1_day,
            paid_course=paid_course,
        )
        date_schedule_8_days = date_free_lesson + timezone.timedelta(days=8)
        schedule_8_days = mixer.blend(
            Schedule,
            datetime=date_schedule_8_days,
            paid_course=paid_course,
        )
        res = student_register.get('/lk/timetables/')
        assert res.status_code == HTTP_200_OK

        context = res.context

        result_data = {
            date_free_lesson.isocalendar()[1]: {
                date_free_lesson.isocalendar()[2]: {
                    'date': date_free_lesson.date(),
                    'schedule': [
                        ScheduleEntity(
                            finished=False,
                            time=date_schedule_2_hours.time(),
                            title=schedule_2_hours.paid_course.course.title,
                            teacher=schedule_2_hours.paid_course.teacher,
                            student=schedule_2_hours.paid_course.student,
                        ),
                        ScheduleEntity(
                            finished=False,
                            time=date_free_lesson.time(),
                            title='Бесплатное занятие',
                            teacher=None,
                            student=user.student,
                        ),
                    ],
                },
                date_schedule_1_day.isocalendar()[2]: {
                    'date': date_schedule_1_day.date(),
                    'schedule': [
                        ScheduleEntity(
                            finished=False,
                            time=date_schedule_1_day.time(),
                            title=schedule_1_day.paid_course.course.title,
                            teacher=schedule_1_day.paid_course.teacher,
                            student=schedule_1_day.paid_course.student,
                        ),
                    ],
                },
            },
            date_schedule_8_days.isocalendar()[1]: {
                date_schedule_8_days.isocalendar()[2]: {
                    'date': date_schedule_8_days.date(),
                    'schedule': [
                        ScheduleEntity(
                            finished=False,
                            time=date_schedule_8_days.time(),
                            title=schedule_8_days.paid_course.course.title,
                            teacher=schedule_8_days.paid_course.teacher,
                            student=schedule_8_days.paid_course.student,
                        ),
                    ],
                },
            },
        }

        assert context['weeks'] == result_data
