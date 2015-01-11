# Moo Mood tracker #

## Aim ##
A simple but extendible mood tracker. Defaults should make updating it quick an easy but there should be options to provide more detailed information.

## Solution ##
Django will provide backend. Angular will cope with the front end.

## Pages ##
Expected pages
Landing: login or 'today'
Logging

Today is a form split into two broad groups:
    - Always seen (all quick easy settings)
        + Sleep
            * Start/end times
            * Rating [0, 5] stars
            * [Option to add naps]
        + Mood [0, 5] stars
        + Alertness [0, 5] stars
        + Productivity [0, 5] stars
        + Diet [0, 5] stars
    - Optional notes:
        + Event
            * Type: e.g. Anxiety (default), irritability, Party etc.
            * Rating [0, 5] stars
            * Tags
            * When
        + Exercise
            * Type (strength/cardio)
            * Rating [0, 5] stars
        + Notes
            * A text field

## Deploy ##

Several steps in deploy, split into 'local' and 'remote'

    1. Less -> CSS
    3. Create ng template file
    2. Concat & Uglify JS & CSS
    4. Move to dist folder:
        * index.html
        * vendor.js
        * scripts.js
        * template.js
        * main.css
        * fonts
        * images
        * python files?
    5. Copy to server
    6. Run:
        * `virtualenv -r requirements.txt mood_tracker`
        * `./manage.py migrate`
    7. mod_wsgi restart?

Probably other stuff too...