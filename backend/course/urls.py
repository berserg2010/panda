from django.urls import path

from .views import (
    CourseListView,
    CourseDetailView,
    TestsCoursesListView,
    TestsCourseLessonListView,
    TasksView,
)


urlpatterns = [
    path('courses/', CourseListView.as_view(), name='courses'),
    path('course/<uuid:pk>', CourseDetailView.as_view(), name='course_detail'),

    path('tests/', TestsCoursesListView.as_view(), name='tests_courses_list'),
    path('tests/<uuid:pk>', TestsCourseLessonListView.as_view(), name='tests_lesson_list'),

    path('tasks/', TasksView.as_view(), name='tasks'),
]
