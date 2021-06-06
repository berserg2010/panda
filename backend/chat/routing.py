from django.urls import re_path

from .consumers.consumers import InterlocutorConsumer


websocket_urlpatterns = [
    # re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
    # re_path(r'ws/chat/(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/lk/chat/$', InterlocutorConsumer.as_asgi()),
]
