from datetime import datetime
from mixer.backend.django import mixer
import pytest
from typing import Union

from account.models import Student
from course.models import GroupsOfCourses, PackageOfLessons, Course
from paid_course.models import FreeLesson, PaidCourse, Schedule
from paid_course.services.timetables import ScheduleEntity


pytestmark = pytest.mark.django_db


@pytest.fixture
def create_course():
    def _create_course(is_published: bool = True) -> Course:
        return mixer.blend(
            Course,
            is_published=is_published,
            group_of_course=mixer.blend(GroupsOfCourses),
            package_of_lessons=mixer.blend(PackageOfLessons),
        )

    return _create_course


@pytest.fixture
def create_free_lesson():
    def _create_free_lesson(student: Student, dt: datetime, finished: bool = False) -> FreeLesson:
        return mixer.blend(
            FreeLesson,
            finished=finished,
            datetime=dt,
            student=student,
        )

    return _create_free_lesson


@pytest.fixture
def create_paid_course():
    def _create_paid_course(student: Student, course: Course, finished: bool = False) -> PaidCourse:
        return mixer.blend(
            PaidCourse,
            finished=finished,
            course=course,
            student=student,
        )

    return _create_paid_course


@pytest.fixture
def create_schedule():
    def _create_schedule(paid_course: PaidCourse, dt: datetime) -> Schedule:
        return mixer.blend(
            Schedule,
            datetime=dt,
            paid_course=paid_course,
        )

    return _create_schedule


class ParameterStorage:

    @staticmethod
    def schedule_data(schedule: Union[PaidCourse, FreeLesson], dt: datetime) -> ScheduleEntity:
        return ScheduleEntity(
            finished=schedule.finished,
            time=dt.time(),
            title=schedule.paid_course.course.title if hasattr(schedule, 'paid_course') else schedule._meta.verbose_name,
            teacher=schedule.teacher,
            student=schedule.student,
            lesson=schedule,
        )
