from rest_framework import serializers
from .models import TrackerLogEntry, EventType

class TrackerLogEntrySerialiser(serializers.ModelSerializer):
    class Meta:
        model = TrackerLogEntry


class EventTypeSerialiser(serializers.ModelSerializer):
    class Meta:
        model = EventType

