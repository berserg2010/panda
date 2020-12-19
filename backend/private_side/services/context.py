from common.utils import date_now, get_user_context
from paid_course.models import FreeLesson


def get_free_lessons(self):
    free_lessons = FreeLesson.objects.filter(
        get_user_context(self.request),
        datetime__gte=date_now,
        finished=False,
    )
    return free_lessons
