
from common.utils import get_user_context
from ..models import FreeLesson


def get_trial_lessons(self):
    trial_lessons = FreeLesson.objects.filter(
        get_user_context(self.request),
        finished=False,
    )
    return trial_lessons
