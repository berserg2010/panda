from django.urls import path
from django.views.generic import TemplateView

from account.views import AccountLoginView


app_name = 'public_side'


urlpatterns = [
    path('', AccountLoginView.as_view(), name='index'),

    path('process/', TemplateView.as_view(template_name='public/process.html'), name='process'),
    path('faq/', TemplateView.as_view(template_name='public/faq.html'), name='faq'),
    path('price/', TemplateView.as_view(template_name='public/price.html'), name='price'),
    path('about/', TemplateView.as_view(template_name='public/about.html'), name='about'),
    # path('teachers/', TemplateView.as_view(template_name='public/teachers.html'), name='teachers'),
    path('testimonials/', TemplateView.as_view(template_name='public/testimonials.html'), name='testimonials'),
    path('contacts/', TemplateView.as_view(template_name='public/contacts.html'), name='contacts'),
]
