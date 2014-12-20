# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trackerlogentry',
            name='tags',
            field=models.ManyToManyField(related_name='logs', null=True, to='tracker.Tags'),
            preserve_default=True,
        ),
    ]
