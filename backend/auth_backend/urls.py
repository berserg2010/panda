from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView

from .views import request_user, register


app_name = 'auth_backend'


urlpatterns = [
    path('request_user/', request_user, name='request_user'),

    # path('register/', register, name='register'),

    path(
        'login/',
        LoginView.as_view(template_name='public/index.html', redirect_authenticated_user=True),
        name='login',
    ),
    path('logout/', LogoutView.as_view(), name='logout'),
]
