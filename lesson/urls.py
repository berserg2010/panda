from django.urls import path

from .views import (
    MaterialsListView,
)


urlpatterns = [
    path('materials/', MaterialsListView.as_view(), name='materials'),
]
