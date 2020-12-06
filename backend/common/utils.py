from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from django.db.models import Q
from datetime import datetime
import os


if os.getenv('DJANGO_SETTINGS_MODULE') == 'backend.settings':
    date_now = timezone.now()
else:
    date_now = datetime(2018, 1, 1, tzinfo=timezone.utc)


def get_user_context(obj, is_filter=True):
    user = obj.request.user
    if is_filter:
        return Q(teacher__user=user) if user.is_staff else Q(student__user=user)
    else:
        return user.teacher if user.is_staff else user.student


def new_password() -> tuple:
    password = get_user_model().objects.make_random_password()
    return password, make_password(password)


def base_inline(model):
    def wrapped(cls):

        cls.model = model
        cls.extra = 0

        return cls
    return wrapped


class CommonIdModelAdmin(admin.ModelAdmin):

    fields = ('id', )
    list_select_related = False
    preserve_filters = False
    save_on_top = True
    readonly_fields = ('id', )


class CommonFieldsModelAdmin(CommonIdModelAdmin):

    list_display = (
        'title',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'title',
        'description',
    )
