from django.views.generic.list import ListView
from django.views.generic.detail import DetailView

from .models import Lesson


# class VocabularyListView(ListView):
#
#     model = Lesson
#     template_name = 'private/vocabulary_list.html'
#
#     def get_queryset(self):
#
#         return super().get_queryset().filter(
#             courses__student__user=self.request.user
#         ).order_by('courselesson__number')
#
#
# class VocabularyDetailView(DetailView):
#
#     model = Lesson
#     template_name = 'private/vocabulary_detail.html'
