import pytest
from mixer.backend.django import mixer
from rest_framework.status import HTTP_200_OK

from ..models import Schedule


pytestmark = pytest.mark.django_db


@pytest.mark.usefixtures('create_student')
class TestTimetablesView:

    def test_timetables_student(self, client_register):

        res = client_register.get('lk/timetables')
        context = res.context

        dir(context)

        assert res.status_code == HTTP_200_OK
        assert context['groups'] == []
