from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.db.models import Prefetch, Q

from .models import BannerOfCourse, Course, CourseLesson


class BannerOfCourseListView(ListView):

    model = BannerOfCourse
    template_name = 'private/courses.html'


class BannerOfCourseDetailView(DetailView):

    model = BannerOfCourse
    template_name = 'private/course_detail.html'


class CourseLessonListView(ListView):

    model = Course
    template_name = 'private/lessons.html'

    def get_queryset(self):

        user = self.request.user
        user_filter = Q(teacher__user=user) if user.is_staff else Q(student__user=user)

        return super().get_queryset().filter(user_filter).prefetch_related(
            Prefetch('lessons')
        )

class LessonView(DetailView):

    model = CourseLesson
    template_name = 'private/lesson.html'


class NotesListView(ListView):

    model = CourseLesson
    template_name = 'private/notes.html'

    def get_queryset(self):

        return super().get_queryset().filter(course__student__user=self.request.user)


class VocabularyListView(ListView):

    model = CourseLesson
    template_name = 'private/vocabulary_list.html'

    def get_queryset(self):

        return super().get_queryset().filter(
            course__student__user=self.request.user
        )


class VocabularyDetailView(DetailView):

    model = CourseLesson
    template_name = 'private/vocabulary_detail.html'
