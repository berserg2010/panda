from datetime import datetime

from common.utils import get_timedelta


def get_valid_until(order_time: datetime, days: int = 28) -> datetime:
    valid_until = get_timedelta(order_time, days)
    return valid_until
