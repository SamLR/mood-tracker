# Minimal import from base so all we copy for the static stuff is what we want
from .base import BASE_DIR, SECRET_KEY, STATIC_URL, STATIC_ROOT

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
