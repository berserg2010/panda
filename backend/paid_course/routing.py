from django.urls import re_path

from .consumers.consumers import StatusInLesson


websocket_urlpatterns = [
    re_path(r'ws/lk/lesson/(?P<group_id>[0-9a-f-]+)/$', StatusInLesson.as_asgi()),
]
