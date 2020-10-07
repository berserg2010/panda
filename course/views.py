from django.views.generic import TemplateView


class CoursesListView(TemplateView):

    template_name = 'private/courses.html'
