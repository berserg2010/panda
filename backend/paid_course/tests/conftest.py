import pytest
from mixer.backend.django import mixer

from course.models import GroupsOfCourses, PackageOfLessons, Course
from paid_course.models import FreeLesson, PaidCourse, Schedule
from paid_course.views import ScheduleEntity


pytestmark = pytest.mark.django_db


@pytest.fixture
def create_course():
    def _create_course(is_published=True):
        return mixer.blend(
            Course,
            is_published=is_published,
            group_of_course=mixer.blend(GroupsOfCourses),
            package_of_lessons=mixer.blend(PackageOfLessons),
        )

    return _create_course


@pytest.fixture
def create_free_lesson():
    def _create_free_lesson(student, dt, finished=False):
        return mixer.blend(
            FreeLesson,
            finished=finished,
            datetime=dt,
            student=student,
        )

    return _create_free_lesson


@pytest.fixture
def create_paid_course():
    def _create_paid_course(student, course, finished=False):
        return mixer.blend(
            PaidCourse,
            finished=finished,
            course=course,
            student=student,
        )

    return _create_paid_course


@pytest.fixture
def create_schedule():
    def _create_schedule(paid_course, dt):
        return mixer.blend(
            Schedule,
            datetime=dt,
            paid_course=paid_course,
        )

    return _create_schedule


class ParameterStorage:

    @staticmethod
    def free_lesson_data(free_lesson, dt) -> ScheduleEntity:
        return ScheduleEntity(
            finished=free_lesson.finished,
            time=dt.time(),
            title='Бесплатное занятие',
            teacher=free_lesson.teacher,
            student=free_lesson.student,
        )

    @staticmethod
    def schedule_data(schedule, dt) -> ScheduleEntity:
        return ScheduleEntity(
            finished=schedule.finished,
            time=dt.time(),
            title=schedule.paid_course.course.title,
            teacher=schedule.paid_course.teacher,
            student=schedule.paid_course.student,
        )
