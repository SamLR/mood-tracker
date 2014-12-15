from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

from tracker import urls as tracker

from .views import BaseView

urlpatterns = patterns('',
    url(r'^$', BaseView.as_view(), name='home'),
    url(r'^api/', include(tracker.api_patterns)),
    url(r'^admin/', include(admin.site.urls)),
)


# If in debug make the static folders available (this includes templates
# which are also served from /static/)
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL)
