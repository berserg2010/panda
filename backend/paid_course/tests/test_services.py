from mixer.backend.django import mixer
import pytest

from common.utils import date_now
from ..models import FreeLesson, Schedule
from ..services.timetables import get_schedule_entity


pytestmark = pytest.mark.django_db


class TestTimetablesService:

    @pytest.mark.parametrize('schedule_obj', [Schedule, FreeLesson])
    def test_get_schedule_entity(self, schedule_obj):
        schedule_obj = mixer.blend(schedule_obj, datetime=date_now)
        schedule = get_schedule_entity(
            schedule_obj
        )
        assert schedule
