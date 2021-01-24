from datetime import datetime, time
from pydantic import BaseModel
from typing import Union, Optional

from django.db.models import Q

from common.utils import (
    get_user_context,
)
from account.models import Teacher, Student
from paid_course.models import FreeLesson, Schedule


class ScheduleEntity(BaseModel):
    finished: bool
    time: time
    title: str = ''
    teacher: Optional[Teacher] = None
    student: Student
    lesson: Union[Schedule, FreeLesson]

    class Config:
        arbitrary_types_allowed = True


def _schedule_entity_adapter(schedules, weeks):
    if schedules:
        for schedule in schedules:

            dt = schedule.datetime.astimezone()
            week_dt = dt.isocalendar()[1]
            weekday_dt = dt.isocalendar()[2]

            title = ''
            teacher = schedule.teacher
            student = schedule.student

            if isinstance(schedule, Schedule):
                title = schedule.paid_course.course.title

            if isinstance(schedule, FreeLesson):
                title = schedule._meta.verbose_name

            schedule_entity = ScheduleEntity(
                finished=schedule.finished,
                time=dt.time(),
                title=title,
                teacher=teacher,
                student=student,
                lesson=schedule,
            )

            weekdays = weeks.get(week_dt)

            if weekdays and weekdays.get(weekday_dt):
                weekday = weeks[week_dt][weekday_dt]
                weekday['schedule'] += [schedule_entity]
                sorted_weekday = sorted(weekday['schedule'], key=lambda x: x.time)
                weeks[week_dt][weekday_dt]['schedule'] = sorted_weekday

            elif weekdays:
                weeks[week_dt][weekday_dt] = {'date': dt.date(), 'schedule': [schedule_entity]}
            else:
                weeks[week_dt] = {weekday_dt: {'date': dt.date(), 'schedule': [schedule_entity]}}

    return weeks


def get_timetables(request, date_start: datetime, date_end: datetime = None) -> list:
    weeks = {}

    free_lessons = FreeLesson.objects.filter(
        get_user_context(request),
        datetime__gte=date_start,
    )

    schedules = Schedule.objects.filter(
        Q(paid_course__teacher__user=request.user) if request.user.is_staff else Q(paid_course__student__user=request.user),
        datetime__gte=date_start,
    )

    weeks = _schedule_entity_adapter(schedules, weeks)
    weeks = _schedule_entity_adapter(free_lessons, weeks)

    return weeks
