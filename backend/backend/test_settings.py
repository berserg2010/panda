from .settings import *  # NOQA


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': ':memory:',
        'HOST': config('POSTGRES_HOST', default='db'),
        'USER': config('POSTGRES_USER', default='postgres'),
        'PASSWORD': config('POSTGRES_PASSWORD', default='postgres'),
    }
}

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.MD5PasswordHasher',
)

DEFAULT_FILE_STORAGE = 'inmemorystorage.InMemoryStorage'

USE_TZ = False
