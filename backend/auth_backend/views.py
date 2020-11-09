from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login, get_user_model
from django.core.mail import send_mail
from django.db.utils import IntegrityError
from django.contrib import messages

from backend import settings
from account.models import Student
from .forms import UserRegisterForm


def register(request):

    if request.method == 'POST':

        form = UserRegisterForm(request.POST)

        if form.is_valid():

            user = form.save()

            student = Student.objects.create(
                user=user,
                phone=request.POST.get('phone'),
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
            messages.success(request, 'Вы оставили заявку!')
            return JsonResponse({'message': 'ok'})

        messages.error(request, 'Неудалось оставить заявку, проверьте данные.')
        return JsonResponse({'message': 'error'})
