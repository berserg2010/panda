from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.contrib.auth import login
from django.core.mail import send_mail
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json

from .models import Student, Payment
from backend import settings
from account.models import Student


@csrf_exempt
def payment_callback(request):

    if request.method == 'POST':
        response_status = request.POST.get('response_status')
        order_status = request.POST.get('order_status')

        if response_status == 'success' and order_status == 'approved':
            context = {'message': 'Операция прошла успешно'}

            merchant_data = {
                i.get('name'): i.get('value')
                for i in json.loads(request.POST.get('merchant_data'))
            }

            Payment.objects.create(
                order = request.POST.get('order_id', ''),
                payment = request.POST.get('payment_id'),
                amount = request.POST.get('actual_amount'),
                order_time = request.POST.get('order_time'),
            )

            print(merchant_data)

        else:
            context = {'message': f'Что то пошло не так..\nСтатус обработки заказа: {order_status}'}

        return render(
            request,
            'public/blank_status_operation.html',
            context,
        )
