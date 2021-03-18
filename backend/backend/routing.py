from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from django.core.asgi import get_asgi_application

from paid_course.routing import websocket_urlpatterns


application = ProtocolTypeRouter({
    'http': get_asgi_application(),

    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns,
            )
        ),
    )
})
