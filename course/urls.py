from django.urls import path

from .views import (
    TimetablesView,
    PaidCourseListView,
    PaidCourseLessonView,

    CourseListView,
    CourseDetailView,
    NotesListView,
    VocabularyListView,
    VocabularyDetailView,
    TestsCoursesListView,
    TestsCourseLessonListView,
    TasksView,
)


urlpatterns = [
    path('timetables/', TimetablesView.as_view(), name='timetables'),

    path('lessons/', PaidCourseListView.as_view(), name='lessons'),
    path('lesson/<uuid:pk>', PaidCourseLessonView.as_view(), name='lesson'),

    path('notes/', NotesListView.as_view(), name='notes'),

    path('courses/', CourseListView.as_view(), name='courses'),
    path('course/<uuid:pk>', CourseDetailView.as_view(), name='course_detail'),

    path('vocabulary/', VocabularyListView.as_view(), name='vocabulary_list'),
    path('vocabulary/<uuid:pk>', VocabularyDetailView.as_view(), name='vocabulary_detail'),

    path('tests/', TestsCoursesListView.as_view(), name='tests_courses_list'),
    path('tests/<uuid:pk>', TestsCourseLessonListView.as_view(), name='tests_lesson_list'),

    path('tasks/', TasksView.as_view(), name='tasks'),
]
