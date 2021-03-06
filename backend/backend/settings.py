from corsheaders.defaults import default_headers
from decouple import config
import os
from pathlib import Path
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from django.contrib import admin
from django.core.management import utils


if config('SENTRY_DSN', default=False):
    sentry_sdk.init(
        dsn=config('SENTRY_DSN'),
        integrations=[DjangoIntegration()],
        traces_sample_rate=1.0,

        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True
    )


BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

SECRET_KEY = config('SECRET_KEY', default=utils.get_random_secret_key())

DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '*',
]


# Corsheaders
CORS_ALLOW_HEADERS = default_headers + (
    'contenttype',
)
CORS_ORIGIN_WHITELIST = [
    f'https://{config("HOST_NAME")}',

    'https://api.fondy.eu',
]

CSRF_TRUSTED_ORIGINS = [
    'http://54.76.178.89',
    'https://54.76.178.89',
    'http://54.154.216.60',
    'https://54.154.216.60',
    'http://23.105.225.142',
    'https://23.105.225.142',
    'http://23.108.217.143',
    'https://23.108.217.143',
]

# Channels
ASGI_APPLICATION = 'backend.routing.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            # 'hosts': [('redis', 6379)],
            'hosts': ['redis://redis:6379/0'],
        },
    },
}

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'rest_framework',
    'channels',
    'django_cleanup.apps.CleanupConfig',

    'settings_site.apps.SettingsSiteConfig',
    'account.apps.AccountConfig',
    'public_side.apps.PublicSideConfig',
    'private_side.apps.PrivateSideConfig',
    'course.apps.CourseConfig',
    'paid_course.apps.PaidCourseConfig',
    'lesson.apps.LessonConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                'settings_site.context_processors.settings_site',
                'account.context_processors.account',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': config('POSTGRES_HOST', default='db'),
        'PORT': config('POSTGRES_PORT', default=5432),
        'NAME': config('POSTGRES_DB', default='postgres'),
        'USER': config('POSTGRES_USER', default='postgres'),
        'PASSWORD': config('POSTGRES_PASSWORD', default='postgres'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Kiev'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

LOGIN_URL = '/'
LOGIN_REDIRECT_URL = '/lk/'
LOGOUT_REDIRECT_URL = '/'

admin.AdminSite.site_header = config('PROJECT_NAME', default='project').upper()
admin.AdminSite.empty_value_display = '--'

NUMB_WEBRTC_USERNAME = config('NUMB_WEBRTC_USERNAME', default='')
NUMB_WEBRTC_CREDENTIAL = config('NUMB_WEBRTC_CREDENTIAL', default='')


# Fondy
MERCHANT_ID = config('MERCHANT_ID', default=1396424, cast=int)

# EMAIL
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = 465
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_SSL = True

# Voximplant
VOXIMPLANT_ACC_ID=config('VOXIMPLANT_ACC_ID')
VOXIMPLANT_ACC_NAME=config('VOXIMPLANT_ACC_NAME')
VOXIMPLANT_APP_ID=config('VOXIMPLANT_APP_ID')
VOXIMPLANT_APP_NAME=config('VOXIMPLANT_APP_NAME')
VOXIMPLANT_API_KEY=config('VOXIMPLANT_API_KEY')
VOXIMPLANT_USER_PASSWORD=config('VOXIMPLANT_USER_PASSWORD')


# REDIS
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SERIALIZER': 'django_redis.serializers.json.JSONSerializer',
        }
    }
}
