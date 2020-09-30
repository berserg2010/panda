from django.urls import path

from .views import index


app_name = 'public_side'

urlpatterns = [
    path('', index, name='index'),
]
