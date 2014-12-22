from rest_framework import viewsets

from .models import TrackerLogEntry, EventType, Tags
from .serialisers import TrackerLogEntrySerialiser, EventTypeSerialiser, TagsSerialiser

_filter_types = (
    ('starts_after',  'start__gte'),
    ('starts_before', 'start__lt'),
    ('ends_after',    'end__gte'),
    ('ends_before',   'end__lt'),
    ('event_pk',      'event_type'),
    ('event_slug',    'event_type__slug'),
)

class LogViewSet(viewsets.ModelViewSet):
    serializer_class = TrackerLogEntrySerialiser
    model = TrackerLogEntry

    def get_queryset(self):
        req = self.request
        if req.method == 'GET' and req.query_params:
            filter_dict = {k: req.query_params[n] for n, k in _filter_types
                                                  if n in req.query_params}
            return self.request.user.logs.filter(**filter_dict)
        return self.request.user.logs.all()

log_list = LogViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })

log_detail = LogViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })


class EventViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerialiser

event_list = EventViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })

event_detail = EventViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })


class TagsViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagsSerialiser

tags_list = TagsViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })

tags_detail = TagsViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })


