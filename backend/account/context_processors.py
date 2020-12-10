from django.contrib.auth.models import AnonymousUser


def get_account(request):
    user = request.user

    if isinstance(user, AnonymousUser):
        account = None
    elif user.is_staff:
        account = user.teacher
    else:
        account = user.student

    return {'account': account}
