from datetime import datetime
from mixer.backend.django import mixer
import pytest
from typing import Union

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.test import Client

from common.utils import date_now
from account.models import Student, Payment
from course.models import GroupsOfCourses, PackageOfLessons, Course
from paid_course.models import FreeLesson, PaidCourse, Schedule
from paid_course.services.timetables import ScheduleEntity
from private_side.services.courses_stat import GroupCoursesStat


pytestmark = pytest.mark.django_db


@pytest.fixture
def create_user_handler():
    def _create_user(user_data):
        return mixer.blend(
            get_user_model(),
            username=user_data.get('username'),
            email=user_data.get('email'),
            first_name=user_data.get('first_name'),
            last_name=user_data.get('last_name'),
            password=make_password(user_data.get('password')),
        )
    return _create_user


@pytest.fixture(autouse=True)
def create_superuser(create_user_handler):
    def _create_superuser():
        return create_user_handler(ParameterStorage.root_auth)
    return _create_superuser


@pytest.fixture(autouse=True)
def create_student(create_user_handler):
    def _create_student():
        user = create_user_handler(ParameterStorage.user_auth)
        student = mixer.blend(
            Student,
            user=user,
        )
        return student
    return _create_student


@pytest.fixture
def client():
    return Client()


@pytest.fixture
def client_register(client, create_superuser):
    create_superuser()
    res = client.login(
        username=ParameterStorage.root_auth.get('username'),
        password=ParameterStorage.root_auth.get('password'),
    )
    assert res
    return client


@pytest.fixture
def student_register(client, create_student):
    create_student()
    res = client.login(
        username=ParameterStorage.user_auth.get('username'),
        password=ParameterStorage.user_auth.get('password'),
    )
    assert res
    return client


@pytest.fixture
def create_course():
    def _create_course(is_published: bool = True,
                       group_of_course: GroupsOfCourses = None) -> Course:
        if group_of_course is None:
            group_of_course = mixer.blend(GroupsOfCourses)
        return mixer.blend(
            Course,
            is_published=is_published,
            group_of_course=group_of_course,
            package_of_lessons=mixer.blend(PackageOfLessons),
        )

    return _create_course


@pytest.fixture
def create_trial_lesson():
    def _create_trial_lesson(student: Student, dt: datetime, finished: bool = False) -> FreeLesson:
        return mixer.blend(
            FreeLesson,
            finished=finished,
            datetime=dt,
            student=student,
        )

    return _create_trial_lesson


@pytest.fixture
def create_payment():
    def _create_payment(student: Student, group_of_course: GroupsOfCourses,
                        order_time: datetime = None) -> Payment:
        if order_time is None:
            order_time = date_now()
        return mixer.blend(
            Payment,
            order_time=order_time,
            valid_until=mixer.SKIP,
            student=student,
            group_of_course=group_of_course,
        )
    return _create_payment


@pytest.fixture
def create_paid_course():
    def _create_paid_course(student: Student, course: Course, finished: bool = False) -> PaidCourse:
        queryset = PaidCourse.objects.filter(course=course)
        if queryset.exists():
            paid_course = queryset.first()
        else:
            paid_course = mixer.blend(
                PaidCourse,
                finished=finished,
                course=course,
                student=student,
            )
        return paid_course

    return _create_paid_course


@pytest.fixture
def create_payment_and_paid_course(create_payment, create_paid_course):
    def _create_payment_and_paid_course(student: Student, course: Course,
                                        order_time: datetime = None, finished: bool = False):
        if order_time is None:
            order_time = date_now()
        payment = create_payment(student, course.group_of_course, order_time)
        paid_course = create_paid_course(student, course, finished)
        return payment, paid_course
    return _create_payment_and_paid_course


@pytest.fixture
def create_schedule():
    def _create_schedule(paid_course: PaidCourse, dt: datetime, finished: bool = True) -> Schedule:
        return mixer.blend(
            Schedule,
            finished=finished,
            datetime=dt,
            paid_course=paid_course,
        )

    return _create_schedule


@pytest.fixture
def create_groups_courses_stat():
    def _create_groups_courses_stat(payment: Payment, paid_for_lessons: int = 0,
                                    schedule_count: int = 0, bonus: int = 0) -> GroupCoursesStat:
        groups_courses_stat = GroupCoursesStat(
            title=payment.group_of_course.title,
            lessons=paid_for_lessons - schedule_count,
            bonus=bonus,
            valid_until=payment.valid_until
        )
        return groups_courses_stat
    return _create_groups_courses_stat


class ParameterStorage:

    root_auth = {
        'username': 'root',
        'email': 'root@asdfasdf.com',
        'first_name': 'first_root',
        'last_name': 'last_root',
        'password': get_user_model().objects.make_random_password(),
    }

    user_auth = {
        'username': 'user',
        'email': 'user@asdfasdf.com',
        'first_name': 'first_user',
        'last_name': 'last_user',
        'password': get_user_model().objects.make_random_password(),
    }

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
