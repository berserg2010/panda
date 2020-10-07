from django.urls import path, include
from django.views.generic import TemplateView

from .views import IndexLkView, SettingsLkView, FreeLessonLkView


app_name = 'private_side'

urlpatterns = [
    path('', IndexLkView.as_view(), name='index'),

    path('settings/', SettingsLkView.as_view(), name='settings'),
    path('free-lesson/', FreeLessonLkView.as_view(), name='free-lesson'),

    path('', include('course.urls')),
]
