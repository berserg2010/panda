from django.urls import path
from django.views.generic import TemplateView

from settings_site.models import SettingsSite, SocialNetwork


app_name = 'public_side'


class TemplateContextView(TemplateView):

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['settings_site'] = SettingsSite.objects.filter(is_active=True).first()
        context['social_networks'] = SocialNetwork.objects.all()
        return context


urlpatterns = [
    path('', TemplateView.as_view(
        template_name='public/index.html',
        extra_context=SettingsSite.objects.filter(is_active=True).first()
    ), name='index'),

    path('process/', TemplateView.as_view(template_name='public/process.html'), name='process'),
    path('faq/', TemplateView.as_view(template_name='public/faq.html'), name='faq'),
    path('price/', TemplateView.as_view(template_name='public/price.html'), name='price'),
    path('about/', TemplateView.as_view(template_name='public/about.html'), name='about'),
    path('teachers/', TemplateView.as_view(template_name='public/teachers.html'), name='teachers'),
    path('testimonials/', TemplateView.as_view(template_name='public/testimonials.html'), name='testimonials'),
    path('contacts/', TemplateView.as_view(template_name='public/contacts.html'), name='contacts'),
]
