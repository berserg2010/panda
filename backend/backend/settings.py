from django.contrib import admin
from django.core.management import utils
from corsheaders.defaults import default_headers
import os
from pathlib import Path
from decouple import config


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
    'http://localhost',
    'https://localhost',
    'http://127.0.0.1',
    'https://127.0.0.1',
    'http://192.168.1.52',
    'https://192.168.1.52',
    'http://192.168.1.52:9000',
    'https://192.168.1.52:9000',
    'https://dev.local:9000',
]
# CSRF_TRUSTED_ORIGINS = ['*']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'rest_framework',

    'settings_site',
    'auth_backend',
    'public_side',
    'private_side',
    'account',
    'course',
    'lesson',
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
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        # 'NAME': os.environ.get('POSTGRES_DB', 'postgres'),
        # 'PORT': 5432,
        # 'USER': os.environ.get('POSTGRES_USER', 'postgres'),
        # 'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'postgres'),

        'ENGINE': 'django.db.backends.postgresql',
        'HOST': config('POSTGRES_HOST', default='db'),
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
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/lk/'
# LOGOUT_URL = 'auth_backend:logout'
LOGOUT_REDIRECT_URL = '/'

admin.AdminSite.site_header = 'Panda'.upper()
admin.AdminSite.empty_value_display = '--'

NUMB_WEBRTC_USERNAME = config('NUMB_WEBRTC_USERNAME', default='')
NUMB_WEBRTC_CREDENTIAL = config('NUMB_WEBRTC_CREDENTIAL', default='')
