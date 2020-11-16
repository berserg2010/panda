import pytest
from mixer.backend.django import mixer

from course.models import Course, Schedule, CourseLesson


pytestmark = pytest.mark.django_db


@pytest.fixture
def courses_generate():
    mixer.cycle().blend(Course)
    mixer.cycle().blend(Schedule)
    mixer.cycle().blend(CourseLesson)


@pytest.mark.usefixtures('courses_generate')
class TestCourse:

    def test_compare_schedule_and_courselesson(self):

        assert Schedule.objects.count() == 5
