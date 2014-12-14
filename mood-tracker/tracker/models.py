"""
Really basic set of log entries. Event Type is a general set of types.
"""


from django.db import models as django_models
from model_utils import models as model_utils

class TrackerLogEntry(model_utils.TimeStampedModel,
                      model_utils.TimeFramedModel):
    """
    A log entry, has a start/end time and a JSON object which stores the
    data of event. Each entry has an 'event type' which is the primary
    classification of the log.

    Entries are timestamped with modified and created datetimes.
    """
    # TimeFramedModel gives start/end -- for logging when the event happened
    # TimeStampedModel gives created/modified -- mostly for conflict resolution
    event_type = django_models.ForeignKey('EventType', db_index=True)
    event_data = django_models.TextField()


class EventType(django_models.Model):
    """
    What sort of event is being logged. Each has name and slug.
    """
    name = django_models.CharField(max_length=50)
    slug = django_models.SlugField()
