from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import ProcessFormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse
from django.db.models import Prefetch, Q

from .models import BannerOfCourse, Course, CourseLesson


class TimetablesView(LoginRequiredMixin, ListView):

    model = Course
    template_name = 'private/timetables.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            student__user=self.request.user,
            finished=False,
        )


class BannerOfCourseListView(LoginRequiredMixin, ListView):

    model = BannerOfCourse
    template_name = 'private/courses.html'


class BannerOfCourseDetailView(LoginRequiredMixin, DetailView):

    model = BannerOfCourse
    template_name = 'private/course_detail.html'


class CourseLessonListView(LoginRequiredMixin, ListView):

    model = CourseLesson
    template_name = 'private/lessons.html'

    def get_queryset(self):

        user = self.request.user
        user_filter = Q(course__teacher__user=user) if user.is_staff else Q(course__student__user=user)

        return super().get_queryset().filter(user_filter, course__finished=False)
        #     .prefetch_related(
        #     Prefetch('lessons')
        # )

class LessonView(LoginRequiredMixin, DetailView):

    model = CourseLesson
    template_name = 'private/lesson.html'

    def get_queryset(self):

        user = self.request.user
        user_filter = Q(course__teacher__user=user) if user.is_staff else Q(course__student__user=user)

        return super().get_queryset().filter(user_filter, course__finished=False)


class NotesListView(ListView):

    model = CourseLesson
    template_name = 'private/notes.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class VocabularyListView(LoginRequiredMixin, ListView):

    model = CourseLesson
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            course__student__user=self.request.user,
            course__finished=False,
        )


class VocabularyDetailView(LoginRequiredMixin, DetailView):

    model = CourseLesson
    template_name = 'private/vocabulary_detail.html'


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

            if tests.get(pk=int(key)).answer == value:
                sum_true_result += 1

        course_lesson.test_result = sum_true_result / count_tests
        course_lesson.save()

        return redirect(reverse('private_side:tests_courses_list'))
