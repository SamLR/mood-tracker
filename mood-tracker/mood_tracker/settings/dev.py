import os
from .base import *

INSTALLED_APPS += ['devserver', ]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = DEBUG


STATICFILES_DIRS += [os.path.join(BASE_DIR, 'templates'),]
