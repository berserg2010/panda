from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.contrib.auth import login
from django.core.mail import send_mail
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from django.db import transaction
import json
from dateutil.parser import parser
from datetime import datetime
from copy import deepcopy

from .models import Student, Payment
from backend import settings
from course.models import GroupsOfCourses, Course
from paid_course.models import FreeLesson, PaidCourse


@csrf_exempt
def payment_callback(request):

    if request.method == 'POST':
        response_status = request.POST.get('response_status')
        order_status = request.POST.get('order_status')

        if response_status == 'success' and order_status == 'approved':
            context = {'message': 'Операция прошла успешно'}

            payment_id = request.POST.get('payment_id')
            order_id = request.POST.get('order_id')
            actual_amount = int(request.POST.get('actual_amount')) // 100
            order_time = datetime.strptime(request.POST.get('order_time'), '%d.%m.%Y %H:%M:%S')

            merchant_data = {
                i.get('name'): i.get('value')
                for i in json.loads(request.POST.get('merchant_data'))
            }
            student_id = merchant_data.get('student_id')
            bonus_id = merchant_data.get('bonus_id')
            course_id = merchant_data.get('course_id')
            paid_for_lessons = merchant_data.get('paid_for_lessons')

            student = Student.objects.get(pk=student_id)
            course = Course.objects.get(pk=course_id)

            payment_base = Payment(
                payment=payment_id,
                amount=actual_amount,
                order=order_id,
                order_time=order_time,

                paid_for_lessons=paid_for_lessons,
                student=student,
                group_of_course=course.group_of_course,
            )

            payment_bonus = None
            payment_bonus_ = None
            condition = bonus_id and Student.objects.filter(pk=bonus_id).exists()
            if condition:
                bonus_student = Student.objects.get(pk=bonus_id)
                payment_bonus = deepcopy(payment_base)

                payment_bonus.pk = None
                payment_bonus.amount = None
                payment_bonus.paid_for_lessons = 2
                payment_bonus.bonus = bonus_student

                payment_bonus_ = deepcopy(payment_bonus)
                payment_bonus_.pk = None
                payment_bonus_.student = bonus_student
                payment_bonus_.bonus = student

            paid_course = None
            if not PaidCourse.objects.filter(student=student, course=course).exists():
                paid_course = PaidCourse(
                    student=student,
                    course=course,
                )

            free_lesson = None
            if not Payment.objects.filter(student=student, bonus__isnull=True).exists():
                free_lesson = FreeLesson(
                    student=student,
                )

            with transaction.atomic():
                payment_base.save()

                if payment_bonus is not None and payment_bonus_ is not None:
                    payment_bonus.save()
                    payment_bonus_.save()

                if paid_course is not None:
                    paid_course.save()

                if free_lesson is not None:
                    free_lesson.save()

        else:
            context = {'message': f'Что то пошло не так..\nСтатус обработки заказа: {order_status}'}

        return render(
            request,
            'public/blank_status_operation.html',
            context,
        )
