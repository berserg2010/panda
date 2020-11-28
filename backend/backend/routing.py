from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

import paid_course.routing as paid_course_routing


application = ProtocolTypeRouter({
    'http': get_asgi_application(),

    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                paid_course_routing.websocket_urlpatterns,
            )
        ),
    )
})
