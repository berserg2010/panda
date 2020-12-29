from django.urls import path

from .views import (
    TimetablesView,
    reschedule_lesson,
    LessonsListView,
    LessonDetailView,

    NotesListView,
    VocabularyListView,
    VocabularyDetailView,
)


urlpatterns = [
    path('timetables/', TimetablesView.as_view(), name='timetables'),
    path('reschedule_lesson/', reschedule_lesson, name='reschedule_lesson'),

    # path('lessons/', LessonsListView.as_view(), name='lessons'),
    # path('lesson/<uuid:pk>', LessonDetailView.as_view(), name='lesson'),

    # path('notes/', NotesListView.as_view(), name='notes'),
    #
    # path('vocabulary/', VocabularyListView.as_view(), name='vocabulary_list'),
    # path('vocabulary/<uuid:pk>', VocabularyDetailView.as_view(), name='vocabulary_detail'),
]
