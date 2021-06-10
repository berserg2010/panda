from django.contrib import admin

from common.utils import CommonIdModelAdmin
from .models import Chat, Message


@admin.register(Chat)
class ChatAdmin(CommonIdModelAdmin):
    list_display = (
        *CommonIdModelAdmin.list_display,
        'interlocutor_one',
        'interlocutor_two',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'interlocutor_one',
        'interlocutor_two',
    )
    search_fields = (
        'interlocutor_one__last_name',
        'interlocutor_two__last_name',
    )
    readonly_fields = (
        'id',
    )
    save_on_top = False


@admin.register(Message)
class MessageAdmin(CommonIdModelAdmin):
    list_display = (
        *CommonIdModelAdmin.list_display,
        'chat',
        'sender',
        'text',
        'sent_at',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'chat',
        'sender',
        'text',
        'sent_at',
    )
    search_fields = (
        'chat__interlocutor_one__last_name',
        'chat__interlocutor_two__last_name',
    )
    readonly_fields = (
        'id',
        'sent_at',
    )
    save_on_top = False
