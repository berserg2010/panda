from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import ProcessFormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse

from course.models import Course, CourseLesson


class CourseListView(LoginRequiredMixin, ListView):

    model = Course
    template_name = 'private/courses.html'


class CourseDetailView(LoginRequiredMixin, DetailView):

    model = Course
    template_name = 'private/course_detail.html'


class TestsCoursesListView(LoginRequiredMixin, ListView):
    model = CourseLesson
    template_name = 'private/tests_list.html'

    def get_queryset(self):
        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class TestsCourseLessonListView(LoginRequiredMixin, DetailView, ProcessFormView):
    model = CourseLesson
    template_name = 'private/test_detail.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )

    def post(self, request, *args, **kwargs):

        result = {key: value for key, value in request.POST.items() if key != 'csrfmiddlewaretoken'}
        course_lesson = self.get_object()
        tests = course_lesson.lesson.homework_tests.all()
        count_tests = tests.count()

        sum_true_result = 0

        for key, value in result.items():

            if tests.get().answer == value:
                sum_true_result += 1

        course_lesson.test_result = sum_true_result / count_tests
        course_lesson.save()

        return redirect(reverse('private_side:tests_courses_list'))


class TasksView(LoginRequiredMixin, TemplateView):
    template_name = 'private/tasks.html'
