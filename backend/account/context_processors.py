from django.contrib.auth.models import AnonymousUser


def account(request):
    user = request.user

    if hasattr(user, 'teacher'):
        _account = user.teacher
    elif hasattr(user, 'student'):
        _account = user.student
    else:
        _account = AnonymousUser()

    return {'account': _account}
