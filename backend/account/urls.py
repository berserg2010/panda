from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView

from account.views import (
    request_user,
    # register,
    payment_callback,
    recover_password,
    SettingsUserView,
)


app_name = 'account'


urlpatterns = [

    path('request-user/', request_user, name='request_user'),

    # path('register/', register, name='register'),

    path(
        'login/',
        LoginView.as_view(template_name='public/index.html', redirect_authenticated_user=True),
        name='login',
    ),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('recover-password/', recover_password, name='recover_password'),

    path('payment-callback/', payment_callback, name='payment_callback'),

    path('settings-user/', SettingsUserView.as_view(), name='settings_user'),

]
