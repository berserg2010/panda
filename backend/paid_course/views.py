import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.utils import timezone
from django.views.generic import TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from common.utils import (
    date_now,
    get_user_context,
    message_success,
    message_error,
)
from account.services.mail import send_mail_reschedule_lesson
from paid_course.models import FreeLesson, PaidCourse, Schedule, LessonResults
from .services.timetables import get_timetables


class TimetablesView(LoginRequiredMixin, TemplateView):
    template_name = 'private/timetables.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['timetable'] = {}

        timetable = get_timetables(self.request)
        context['timetable'] = timetable

        return context


@login_required
def reschedule_lesson(request):
    message = message_error('Отменить занятие можно за 8 часов до начала.')

    if request.method == 'POST':

        data = json.loads(request.body)

        class_name = data.get('class_name')
        obj_id = data.get('obj_id')

        condition = class_name == Schedule.__name__
        if condition:
            lesson = Schedule.objects.get(pk=obj_id)
        else:
            lesson = FreeLesson.objects.get(pk=obj_id)

        if lesson.datetime >= date_now() - timezone.timedelta(hours=8):
            send_mail_reschedule_lesson(lesson)
            message = message_success('Вы отправили заявку.')

    return JsonResponse(message)


class LessonsListView(LoginRequiredMixin, TemplateView):
    template_name = 'private/lessons.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['timetable'] = {}

        timetable = get_timetables(self.request, one_day=True)
        context['timetable'] = timetable

        return context


class CommonLessonView(LoginRequiredMixin, DetailView):
    template_name = 'private/lesson.html'


class LessonDetailView(CommonLessonView):
    model = PaidCourse


class TrialLessonView(CommonLessonView):
    model = FreeLesson


class NotesListView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/notes.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            get_user_context(self.request),
        ).exclude(
            paid_course_lessons__note='',
        )


class VocabularyListView(LoginRequiredMixin, ListView):
    model = PaidCourse
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(get_user_context(self.request))


class VocabularyDetailView(LoginRequiredMixin, DetailView):
    model = LessonResults
    template_name = 'private/vocabulary_detail.html'
