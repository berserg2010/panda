import pytest
from mixer.backend.django import mixer

from course.models import Course, CourseLesson


pytestmark = pytest.mark.django_db


@pytest.fixture
def courses_generate():
    mixer.cycle().blend(Course)


@pytest.mark.usefixtures('courses_generate')
class TestCourse:

    def test_compare_course(self):

        assert Course.objects.count() == 5
