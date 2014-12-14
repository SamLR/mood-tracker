from django.conf.urls import patterns, include, url
from django.contrib import admin

from tracker import urls as tracker

urlpatterns = patterns('',
    url(r'api/', include(tracker.api_patterns)),
    url(r'^admin/', include(admin.site.urls)),
)
