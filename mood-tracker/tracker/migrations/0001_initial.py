# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
from django.conf import settings
import model_utils.fields

# TODO Delete all migrations and squash into one prior to deploy

class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.SlugField(unique=True)),
                ('name', models.CharField(max_length=256)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.SlugField(unique=True)),
                ('name', models.CharField(max_length=256)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TrackerLogEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('start', models.DateTimeField(null=True, verbose_name='start', blank=True)),
                ('end', models.DateTimeField(null=True, verbose_name='end', blank=True)),
                ('data', models.TextField()),
                ('event_type', models.ForeignKey(related_name='logs', to='tracker.EventType')),
                ('tags', models.ManyToManyField(related_name='logs', to='tracker.Tags')),
                ('user', models.ForeignKey(related_name='logs', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('start',),
            },
            bases=(models.Model,),
        ),
    ]
