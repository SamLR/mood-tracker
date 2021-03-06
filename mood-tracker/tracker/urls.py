"""
Tracker API, has four end-points:
    api/logs/        -- Get all logs
    api/logs/[id]    -- Get log with id
    api/events/      -- Get list of events
    api/events/[id]  -- Get specific event type object (pretty useless)
"""

from django.conf.urls import patterns, url
from . import api

# TODO look at adding a day end point that selects all events from a day
api_patterns = patterns('',
    url(r'^logs/$',                 api.log_list,     name='api.log_list'    ),
    url(r'^logs/(?P<pk>[0-9]+)/$',  api.log_detail,   name='api.log_detail'  ),
    url(r'^events/$',               api.event_list,   name='api.event_list'  ),
    url(r'^events/(?P<pk>[0-9]+)$', api.event_detail, name='api.event_detail'),
    url(r'^tags/$',                 api.tags_list,    name='api.tags_list'  ),
    url(r'^tags/(?P<pk>[0-9]+)$',   api.tags_detail,  name='api.tags_detail'),
)
