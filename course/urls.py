from django.urls import path

from .views import (
    TimetablesView,
    BannerOfCourseListView,
    BannerOfCourseDetailView,
    CourseLessonListView,
    LessonView,
    NotesListView,
    VocabularyListView,
    VocabularyDetailView,
    TestsCoursesListView,
    TestsCourseLessonListView,
    TasksView,
)


urlpatterns = [
    path('timetables/', TimetablesView.as_view(), name='timetables'),

    path('courses/', BannerOfCourseListView.as_view(), name='courses'),
    path('course/<int:pk>', BannerOfCourseDetailView.as_view(), name='course-detail'),

    path('lessons/', CourseLessonListView.as_view(), name='lessons'),
    path('lesson/<int:pk>', LessonView.as_view(), name='lesson'),

    path('notes/', NotesListView.as_view(), name='notes'),

    path('vocabulary/', VocabularyListView.as_view(), name='vocabulary_list'),
    path('vocabulary/<int:pk>', VocabularyDetailView.as_view(), name='vocabulary_detail'),

    path('tests/', TestsCoursesListView.as_view(), name='tests_courses_list'),
    path('tests/<int:pk>', TestsCourseLessonListView.as_view(), name='tests_lesson_list'),

    path('tasks/', TasksView.as_view(), name='tasks'),
]
