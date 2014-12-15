from rest_framework import serializers
from .models import TrackerLogEntry, EventType, Tags

class TrackerLogEntrySerialiser(serializers.ModelSerializer):
    class Meta:
        model = TrackerLogEntry


class EventTypeSerialiser(serializers.ModelSerializer):
    class Meta:
        model = EventType


class TagsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Tags

