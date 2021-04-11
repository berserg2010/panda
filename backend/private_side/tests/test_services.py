import pytest

from common.utils import date_now, get_timedelta, sorted_list_pydantic_models
from paid_course.models import Schedule
from ..services.courses_stat import get_courses_stat, get_student_schedule_count


pytestmark = pytest.mark.django_db


class TestCoursesStat:

    def test_get_courses_stat(self, create_student, create_course, create_payment_and_paid_course,
                              create_schedule, create_groups_courses_stat):
        student = create_student()
        course = create_course()
        payment, paid_course = create_payment_and_paid_course(student, course, order_time=get_timedelta(days=-14))

        # Первая запись в расписании
        create_schedule(paid_course, date_now())
        schedule_count = get_student_schedule_count(
            student,
            payment.group_of_course,
            payment.order_time,
            payment.valid_until,
        )
        assert schedule_count == 1

        paid_for_lessons = payment.paid_for_lessons
        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]

        # Вторая запись в расписании
        create_schedule(paid_course, date_now())
        schedule_count = Schedule.objects.count()
        assert schedule_count == 2

        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]

        # В статистику попадают только завершенные занятия
        create_schedule(paid_course, date_now(), finished=False)
        schedule_count = get_student_schedule_count(
            student,
            payment.group_of_course,
            payment.order_time,
            payment.valid_until,
        )
        assert schedule_count == 2
        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]

        # Вторая оплата
        payment, paid_course = create_payment_and_paid_course(student, course, order_time=get_timedelta(days=2))
        paid_for_lessons += payment.paid_for_lessons
        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]


    def test_get_courses_stat_after_valid_until(self, create_student, create_course,
                                                create_payment_and_paid_course, create_groups_courses_stat):
        student = create_student()
        course = create_course()

        create_payment_and_paid_course(student, course, order_time=get_timedelta(days=-29))
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == []

        # Оплата после valid_until
        payment, paid_course = create_payment_and_paid_course(student, course, order_time=get_timedelta())
        paid_for_lessons = payment.paid_for_lessons
        schedule_count = get_student_schedule_count(
            student,
            payment.group_of_course,
            payment.order_time,
            payment.valid_until,
        )
        assert schedule_count == 0
        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]


    def test_get_courses_stat_new_course(self, create_student, create_course, create_payment_and_paid_course,
                                         create_schedule, create_groups_courses_stat):
        student = create_student()
        course = create_course()
        payment, paid_course = create_payment_and_paid_course(student, course, order_time=get_timedelta())
        paid_for_lessons = payment.paid_for_lessons

        # Новый курс
        course = create_course(group_of_course=course.group_of_course)
        payment, paid_course = create_payment_and_paid_course(student, course, order_time=get_timedelta(days=14))
        paid_for_lessons += payment.paid_for_lessons
        schedule_count = get_student_schedule_count(
            student,
            payment.group_of_course,
            payment.order_time,
            payment.valid_until,
        )

        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]

        create_schedule(paid_course, get_timedelta(days=14))
        schedule_count = get_student_schedule_count(
            student,
            payment.group_of_course,
            payment.order_time,
            payment.valid_until,
        )
        assert schedule_count == 1

        data = create_groups_courses_stat(payment, paid_for_lessons, schedule_count)
        groups_courses_stat = get_courses_stat(student.user)
        assert groups_courses_stat == [data]


    def test_get_courses_stat_new_group_of_courses(self, create_student, create_course, create_payment_and_paid_course,
                                         create_schedule, create_groups_courses_stat):
        student = create_student()
        course_one = create_course()

        payment_one, paid_course_one = create_payment_and_paid_course(student, course_one, order_time=get_timedelta())
        paid_for_lessons_one = payment_one.paid_for_lessons

        create_schedule(paid_course_one, get_timedelta(days=7))
        create_schedule(paid_course_one, get_timedelta(days=14))
        schedule_count_one = get_student_schedule_count(
            student,
            payment_one.group_of_course,
            payment_one.order_time,
            payment_one.valid_until,
        )

        # Новый курс с новой группой
        course_two = create_course()

        payment_two, paid_course_two = create_payment_and_paid_course(student, course_two, order_time=get_timedelta(days=1))
        paid_for_lessons_two = payment_two.paid_for_lessons

        create_schedule(paid_course_two, get_timedelta(days=3))
        create_schedule(paid_course_two, get_timedelta(days=10))
        create_schedule(paid_course_two, get_timedelta(days=17))
        schedule_count_two = get_student_schedule_count(
            student,
            payment_two.group_of_course,
            payment_two.order_time,
            payment_two.valid_until,
        )

        data_one = create_groups_courses_stat(payment_one, paid_for_lessons_one, schedule_count_one)
        data_two = create_groups_courses_stat(payment_two, paid_for_lessons_two, schedule_count_two)
        data = sorted_list_pydantic_models([data_one, data_two], 'valid_until')

        groups_courses_stat = get_courses_stat(student.user)

        assert groups_courses_stat == data
