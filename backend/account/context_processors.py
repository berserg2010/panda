from django.contrib.auth.models import AnonymousUser


def get_account(request):
    user = request.user

    if hasattr(user, 'teacher'):
        account = user.teacher
    elif hasattr(user, 'student'):
        account = user.student
    else:
        account = None

    return {'account': account}
