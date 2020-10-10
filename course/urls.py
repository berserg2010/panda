from django.urls import path

from .views import (
    BannerOfCourseListView,
    BannerOfCourseDetailView,
    CourseLessonListView,
    LessonView,
    NotesListView,
    VocabularyListView,
    VocabularyDetailView,

)


urlpatterns = [
    path('courses/', BannerOfCourseListView.as_view(), name='courses'),
    path('course/<int:pk>', BannerOfCourseDetailView.as_view(), name='course-detail'),

    path('lessons/', CourseLessonListView.as_view(), name='lessons'),
    path('lesson/<int:pk>', LessonView.as_view(), name='lesson'),

    path('notes/', NotesListView.as_view(), name='notes'),

    path('vocabulary/', VocabularyListView.as_view(), name='vocabulary_list'),
    path('vocabulary/<int:pk>', VocabularyDetailView.as_view(), name='vocabulary_detail'),
]
