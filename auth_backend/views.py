from django.http import HttpResponse
from django.contrib.auth import login, get_user_model


def register(request):

    if request.POST:
        user = get_user_model().objects.create_user(
            first_name=request.POST.get('first_name'),
            last_name=request.POST.get('last_name'),
            email=request.POST.get('email'),
            username=request.POST.get('username'),
            password=request.POST.get('password'),
        )
        login(request, user)

    return HttpResponse('!!!')
