from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Lesson, Article


class MaterialsListView(LoginRequiredMixin, ListView):

    model = Lesson
    template_name = 'private/materials.html'


class ArticlesListView(LoginRequiredMixin, ListView):

    model = Article
    template_name = 'private/articles_list.html'
