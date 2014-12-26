"""
Really basic set of log entries. Event Type is a general set of types.
"""

from django.db import models as django_models
from django.contrib.auth.models import User

from model_utils import models as model_utils

class TrackerLogEntry(model_utils.TimeStampedModel):
    """
    A log entry, has a start/end time and a JSON object which stores the
    data of event. Each entry has an 'event type' which is the primary
    classification of the log.

    Entries are timestamped with modified and created datetimes.
    """
    # Added via TimeStamped: created, modified (all DateTimes)
    user = django_models.ForeignKey(User, db_index=True, related_name='logs')
    event_type = django_models.ForeignKey('EventType', db_index=True, related_name='logs')

    # Want these indexed & non-null, timeframed model is neither indexed or required
    start = django_models.DateTimeField(db_index=True)
    end   = django_models.DateTimeField(db_index=True)

    tags = django_models.ManyToManyField('Tags', related_name='logs', null=True)
    data = django_models.TextField(null=True)
    rating = django_models.IntegerField(null=True)

    class Meta:
        ordering = ('start',)

# Include info on directives etc.
class EventType(django_models.Model):
    """
    What sort of event is being logged. Each has name and slug.
    """
    slug = django_models.SlugField(unique=True)
    name = django_models.CharField(max_length=256)


class Tags(django_models.Model):
    """
    Simple tag table
    """
    slug = django_models.SlugField(unique=True)
    name = django_models.CharField(max_length=256)
