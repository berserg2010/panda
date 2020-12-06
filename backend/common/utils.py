from django.contrib import admin
from django.utils import timezone
from datetime import datetime
import os


if os.getenv('DJANGO_SETTINGS_MODULE') == 'backend.settings':
    date_now = timezone.now()
else:
    # date_now = datetime(2018, 1, 1, tzinfo=timezone.get_current_timezone())
    date_now = datetime(2018, 1, 1, tzinfo=timezone.utc)


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
