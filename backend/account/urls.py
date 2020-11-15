from django.urls import path

from .views import payment_callback

app_name = 'account'


urlpatterns = [

    path('payment-callback/', payment_callback, name='payment_callback'),

]
