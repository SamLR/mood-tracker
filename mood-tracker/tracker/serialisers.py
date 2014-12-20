from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TrackerLogEntry, EventType, Tags

class EventTypeSerialiser(serializers.ModelSerializer):
    class Meta:
        model = EventType


class TagsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Tags

class TrackerLogEntrySerialiser(serializers.ModelSerializer):
    # TODO infer user

    class Meta:
        model = TrackerLogEntry

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if data['start'] > data['end']:
            raise serializers.ValidationError("End must occur after start")
        return data

