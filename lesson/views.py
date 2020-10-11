from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Lesson


class MaterialsListView(LoginRequiredMixin, ListView):

    model = Lesson
    template_name = 'private/materials.html'
