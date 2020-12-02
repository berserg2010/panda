from django.contrib import admin
from django.utils import timezone
import os

if os.getenv('DJANGO_SETTINGS_MODULE') == 'backend.settings':
    date_now = timezone.now()
else:
    date_now = timezone.datetime(2020, 1, 1, 0, 0)


def hardware_inline(model):
    def wrapped(cls):

        cls.model = model
        cls.extra = 0

        return cls
    return wrapped


class CommonIdModelAdmin(admin.ModelAdmin):

    fields = ('id', )
    # list_display_links = ("description",)
    # list_filter = ["manufacturer"]
    list_select_related = False
    preserve_filters = False
    # save_as = True
    # save_as_continue = False
    save_on_top = True
    # search_fields = ["inventory_number", "description"]
    # exclude = ("workstation", )
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
