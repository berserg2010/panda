from django.urls import path, include

from .views import IndexLkView, SettingsLkView, FreeLessonLkView


app_name = 'private_side'

urlpatterns = [
    path('', IndexLkView.as_view(), name='index'),

    path('settings/', SettingsLkView.as_view(), name='settings'),
    path('free-lesson/', FreeLessonLkView.as_view(), name='free_lesson'),

    path('', include('course.urls')),
    path('', include('lesson.urls')),
]
