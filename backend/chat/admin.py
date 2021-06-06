from django.contrib import admin

from common.utils import CommonIdModelAdmin
from .models import Message


@admin.register(Message)
class PaymentAdmin(CommonIdModelAdmin):
    list_display = (
        *CommonIdModelAdmin.list_display,
        'sender',
        'receiver',
        'text',
        'sent_at',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'sender',
        'receiver',
        'text',
        'sent_at',
    )
    search_fields = (
        'sender__user__last_name',
        'receiver__user__last_name',
    )
    list_filter = (
        'sender',
        'receiver',
    )
