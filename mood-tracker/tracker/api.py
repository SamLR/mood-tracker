from rest_framework import viewsets

from .models import TrackerLogEntry, EventType, Tags
from .serialisers import TrackerLogEntrySerialiser, EventTypeSerialiser, TagsSerialiser

class LogViewSet(viewsets.ModelViewSet):
    queryset = TrackerLogEntry.objects.all()
    serializer_class = TrackerLogEntrySerialiser

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


