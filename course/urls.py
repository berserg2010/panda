from django.urls import path

from .views import BannerOfCourseListView, BannerOfCourseDetailView, CourseLessonListView


urlpatterns = [
    path('courses/', BannerOfCourseListView.as_view(), name='courses'),
    path('course/<int:pk>', BannerOfCourseDetailView.as_view(), name='course-detail'),
    path('lessons/', CourseLessonListView.as_view(), name='lessons'),
]
