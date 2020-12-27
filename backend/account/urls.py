from django.contrib.auth.views import LogoutView
from django.urls import path

from account.views import (
    request_user,
    payment_callback,
    recover_password,
    SettingsUserView,
)


app_name = 'account'


urlpatterns = [

    path('request-user/', request_user, name='request_user'),

    path('logout/', LogoutView.as_view(), name='logout'),

    path('recover-password/', recover_password, name='recover_password'),

    path('payment-callback/', payment_callback, name='payment_callback'),

    path('lk/settings-user/', SettingsUserView.as_view(), name='settings_user'),

]
