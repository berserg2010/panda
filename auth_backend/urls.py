from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.forms import UserCreationForm

from .views import register


app_name = 'auth_backend'


class CustomUserCreationForm(UserCreationForm):
    password2 = None


urlpatterns = [
    path('register/', register, name='register'),

    path(
        'login/',
        LoginView.as_view(template_name='public/index.html', redirect_authenticated_user=True),
        name='login',
    ),
    path('logout/', LogoutView.as_view(), name='logout'),
]
