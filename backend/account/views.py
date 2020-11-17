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
        response_status = request.POST.get()
        order_status = request.POST.get()

        if response_status == 'success' and order_status == 'approved':
            context = {'message': 'Операция прошла успешно'}

            merchant_data = {
                i.get(): i.get()
                for i in json.loads(request.POST.get())
            }

            Payment.objects.create(
                order =request.POST.get(),
                payment =request.POST.get(),
                amount =request.POST.get(),
                order_time =request.POST.get(),
            )

            print(merchant_data)

        else:
            context = {'message': f'Что то пошло не так..\nСтатус обработки заказа: {order_status}'}

        return render(
            request,
            'public/blank_status_operation.html',
            context,
        )
