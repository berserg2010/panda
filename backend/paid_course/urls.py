from django.urls import path

from .views import (
    TimetablesView,
    PaidCourseListView,
    PaidCourseLessonView,

    NotesListView,
    VocabularyListView,
    VocabularyDetailView,
)


urlpatterns = [
    path('timetables/', TimetablesView.as_view(), name='timetables'),

    # path('lessons/', PaidCourseListView.as_view(), name='lessons'),
    # path('lesson/<uuid:pk>', PaidCourseLessonView.as_view(), name='lesson'),
    #
    # path('notes/', NotesListView.as_view(), name='notes'),
    #
    # path('vocabulary/', VocabularyListView.as_view(), name='vocabulary_list'),
    # path('vocabulary/<uuid:pk>', VocabularyDetailView.as_view(), name='vocabulary_detail'),
]
