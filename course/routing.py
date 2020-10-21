from django.urls import re_path, path, include

from . import consumers


websocket_urlpatterns = [
    # re_path(r'/lesson/(?P<room_name>\w+)/$', consumers.WebRTCConsumer),
    # re_path(r'ws/chat/(?P<room_name>\[0-9a-f-]+)/$', consumers.WebRTCConsumer),
    re_path(r'ws/chat/$', consumers.WebRTCConsumer),
]
