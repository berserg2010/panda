from datetime import datetime

from django.utils import timezone


def get_valid_until(order_time: datetime, days: int = 28) -> datetime:
    valid_until = order_time + timezone.timedelta(days=days)
    return valid_until
