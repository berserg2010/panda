from django.urls import path

from .views import CoursesListView, ChoiceCourseView


urlpatterns = [
    path('courses/', CoursesListView.as_view(), name='courses'),
    path('course/<int:pk>', ChoiceCourseView.as_view(), name='course-detail'),
]
