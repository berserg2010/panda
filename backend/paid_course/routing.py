from django.urls import re_path

from .consumers.consumers import ChatConsumer, StatusInLesson


websocket_urlpatterns = [
    # re_path(r'/lesson/(?P<room_name>\w+)/$', consumers.WebRTCConsumer),
    # re_path(r'ws/chat/(?P<room_name>\[0-9a-f-]+)/$', consumers.WebRTCConsumer),
    re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
    re_path(r'ws/lk/lesson/(?P<group_id>[0-9a-f-]+)/$', StatusInLesson.as_asgi()),
    # re_path(r'/ws/lesson/peerjs/$', consumers.WebRTCConsumer),
]
