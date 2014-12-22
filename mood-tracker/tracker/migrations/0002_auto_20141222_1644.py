# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations

_basic_types = [
    {'name': 'Sleep',         'slug': 'sleep'},
    {'name': 'Mood',          'slug': 'mood'},
    {'name': 'Alertness',     'slug': 'alertness'},
    {'name': 'Productivity',  'slug': 'productivity'},
    {'name': 'Diet',          'slug': 'diet'},
    {'name': 'Event',         'slug': 'external-event'},
    {'name': 'Exercise',      'slug': 'exercise'},
    {'name': 'Day Notes',     'slug': 'day-note'},
]

def add_basic_events(apps, schema_editor):
    EventType = apps.get_model('tracker', 'EventType')
    for event in _basic_types:
        try:
            EventType.objects.get(slug=event['slug'])
        except EventType.DoesNotExist:
            EventType.objects.create(**event)


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_basic_events)
    ]
