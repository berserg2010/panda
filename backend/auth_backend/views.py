from django.http import HttpResponse
from django.contrib.auth import login, get_user_model
from django.core.mail import send_mail

from backend import settings
from account.models import Student, Wallet


def register(request):

    if request.POST:
        user = get_user_model().objects.create_user(
            first_name=request.POST.get('first_name'),
            last_name=request.POST.get('last_name'),
            email=request.POST.get('email'),
            username=request.POST.get('username'),
            password=request.POST.get('password'),
        )

        print(request.POST.get('phone'))

        student = Student.objects.create(
            user=user,
            phone=request.POST.get('phone'),
            wallet=Wallet.objects.create(),
        )

        send_mail(
            'Panda',
            '''
            Вы зарегистрировались на сайте Panda!
            С Вами скоро свяжутся.
            ''',
            settings.EMAIL_HOST_USER,
            [user.email],
        )

        send_mail(
            'Panda',
            f'{user.get_full_name()} зарегистрировался.\n'
            f'ID: {student.pk}\n'
            f'Телефон: {student.phone}\n'
            f'Эл. почта: {user.email}\n',
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER],
        )

        login(request, user)

    return HttpResponse('!!!')
