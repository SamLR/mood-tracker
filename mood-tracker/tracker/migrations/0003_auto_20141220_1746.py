# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0002_auto_20141220_1557'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackerlogentry',
            name='rating',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='trackerlogentry',
            name='data',
            field=models.TextField(null=True),
            preserve_default=True,
        ),
    ]
