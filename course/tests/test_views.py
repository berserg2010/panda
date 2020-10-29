import pytest
from mixer.backend.django import mixer

from ..models import Course, Schedule, CourseLesson, BannerOfCourse


pytestmark = pytest.mark.django_db


@pytest.fixture
def courses_generate():
    mixer.cycle().blend(Course, Schedule, CourseLesson)


@pytest.mark.usefixtures('courses_generate')
class TestCourse:

    def test_compare_schedule_and_courselesson(self):

        assert Schedule.objects.count() == 5
