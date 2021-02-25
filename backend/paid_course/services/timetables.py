from datetime import datetime, time
from pydantic import BaseModel
from typing import Union, Optional, List, Dict

from django.db.models import Q

from common.utils import date_now, get_user_context
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


def get_schedule_entity(schedule: Union[Schedule, FreeLesson]) -> ScheduleEntity:
    dt = schedule.datetime.astimezone()

    schedule_entity = ScheduleEntity(
        finished=schedule.finished,
        time=dt.time(),
        title=schedule.paid_course.course.title if isinstance(schedule, Schedule) else schedule._meta.verbose_name,
        teacher=schedule.teacher,
        student=schedule.student,
        lesson=schedule,
    )

    return schedule_entity


def _schedule_entity_adapter(schedules: List[Union[Schedule, FreeLesson]], weeks: Union[List, Dict]) -> Union[List, Dict]:
    if schedules:
        for schedule in schedules:

            dt = schedule.datetime.astimezone()
            week_dt = dt.isocalendar()[1]
            weekday_dt = dt.isocalendar()[2]

            schedule_entity = get_schedule_entity(schedule)

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


def get_timetables(request, date_start: datetime = date_now(), date_end: datetime = None, one_day: bool = False) -> Union[Dict, List]:

    if one_day:
        filter_exp = Q(datetime__date=date_start)
    elif date_end is not None:
        filter_exp = Q(Q(datetime__date__gte=date_start) & Q(datetime__date__lte=date_end))
    else:
        filter_exp = Q(datetime__date__gte=date_start.date())

    schedules = Schedule.objects.filter(
        Q(paid_course__teacher__user=request.user) if request.user.is_staff else Q(paid_course__student__user=request.user),
        filter_exp,
    )

    free_lessons = FreeLesson.objects.filter(
        get_user_context(request),
        filter_exp,
    )

    if one_day:
        timetable = []
        timetable += [get_schedule_entity(schedule) for schedule in schedules]
        timetable += [get_schedule_entity(free_lesson) for free_lesson in free_lessons]
        timetable = sorted(timetable, key=lambda x: x.time)
    else:
        timetable = {}

        timetable = _schedule_entity_adapter(schedules, timetable)
        timetable = _schedule_entity_adapter(free_lessons, timetable)

    return timetable
