from django.urls import path

from .views import (
    MaterialsListView,
    ArticlesListView,
)


urlpatterns = [
    path('materials/', MaterialsListView.as_view(), name='materials'),
    path('articles/', ArticlesListView.as_view(), name='articles'),
]
