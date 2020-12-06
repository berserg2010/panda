from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [

    path('', include('account.urls')),

    path('', include('public_side.urls')),

    path('lk/', include('private_side.urls')),

    path('admin/', admin.site.urls),

]

handler404 = TemplateView.as_view(template_name='public/not-found.html')

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
