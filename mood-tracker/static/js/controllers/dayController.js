/* global angular, moment, _ */

angular.module('moodTracker')
.controller('dayController', [
    '$scope', '$http', '$state', 'eventTypeService', 'tagsService', 'dayService',
    function ($scope, $http, $state, eventServicePromise, tagsServicePromise, dayServicePromise) {
        'use strict';

        var _dayStart, _dayEnd, _eventsService, _tagService, _dayService, _dayLog,
            _ratingOnlyEvents = ['mood', 'alertness', 'productivity', 'diet'];

        // TODO Should auto generate view based on events rather than hard coding
        $scope.tags = [];
        $scope.sleep = {};
        $scope.miscRatings = {};
        
        function _getSleep () {
            var sleep = $scope.sleep,
                startHr  = sleep.start.split(':')[0],
                startMin = sleep.start.split(':')[1],
                start = moment(_dayStart).hours(startHr).minutes(startMin),
                end = moment(start).add(parseFloat(sleep.duration), 'hours');

            if (end > _dayEnd) { // put the sleep at the start of the day
                end   =   end.add(-1, 'days');
                start = start.add(-1, 'days');
            }
            
            return {
                    start:      start.format(),
                    end:        end.format(),
                    tags:       sleep.tags,
                    data:       JSON.stringify({notes: sleep.notes}) || '',
                    event_type: _eventsService.getEventBySlug('sleep'), // TODO set this else where?
                };
        }

        function _getFullDayEvent(typeSlug, dataObject) {
            return _.extend({
                start:      _dayStart.format(),
                end:        _dayEnd.format(),
                event_type: _eventsService.getEventBySlug(typeSlug)
            }, dataObject);
        }

        $scope.submitDay = function() {
            var day = { sleep:_getSleep() };

            _.each(_ratingOnlyEvents, function (typeSlug) {
                day[typeSlug] = _getFullDayEvent(typeSlug, {
                    rating: $scope.miscRatings[typeSlug]
                });
            });

            _dayService.addDay(day);
        };

        function _init(){
            var today = moment(),
                params = $state.params;

            if (params.year && params.month && params.day) {
                _dayStart = moment({
                    year:  params.year,
                    month: params.month - 1, // moment considers Jan == 00
                    day:   params.day
                });
            } else {
                _dayStart = moment().hours(0).minutes(0).seconds(0); // Start of today
            }
            
            _dayEnd = moment(_dayStart).hours(23).minutes(59);

            eventServicePromise.then(function (service) {
                 _eventsService = service;
                console.log('eventTypes', _eventsService.getEvents());
            });

            tagsServicePromise.then(function (service) {
                _tagService = service;
                console.log('tags', _tagService.getTags());
                $scope.tags = _tagService.getTags();
            });

            dayServicePromise.then(function (service) {
                _dayService = service;
                // Actually do something with this
                _dayLog = service.getDay(_dayStart);
            });
        }

        _init();
    }
]);