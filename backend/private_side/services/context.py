from common.utils import get_user_context
from paid_course.models import FreeLesson


def get_free_lessons(self):
    free_lessons = FreeLesson.objects.filter(get_user_context(self.request))
    return free_lessons
