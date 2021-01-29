from django.urls import path, include

from .views import (
    IndexLkView,
    FreeLessonView,
    StudentsListView,
)


app_name = 'private_side'


urlpatterns = [
    path('', IndexLkView.as_view(), name='index'),

    path('free-lesson/', FreeLessonView.as_view(), name='free_lesson'),
    path('students/', StudentsListView.as_view(), name='students'),

    path('', include('course.urls')),
    path('', include('paid_course.urls')),

    # path('', include('lesson.urls')),
]
