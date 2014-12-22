/* global angular, moment */

angular.module('moodTracker').controller('dayController', [
    '$scope', '$http', '$state', 'eventTypeService', 'tagsService',
    function ($scope, $http, $state, eventTypeService, tagsService) {
        'use strict';

        var _date = null,
            _events = {};

        // TODO Should auto generate view based on events rather than hard coding
        $scope.tags = {};
        $scope.sleep = {};
        $scope.miscRatings = {};
        
        function _getSleep () {
            var sleep = $scope.sleep,
                data = {
                    user: 1,
                    event_type: 1,
                    rating: parseInt(sleep.rating, 10)
                },
                start = _.map(sleep.start.split(':'), function (a){
                    return parseInt(a,10);
                }),
                tags;

            data.start = moment(_date).add(-1, 'days')
                                      .hours(start[0]).minutes(start[1]);
            data.end   = moment(data.start).add(sleep.end, 'hours').format();
            data.start = data.start.format();

            if (sleep.notes) {
                data.data = JSON.stringify({notes: sleep.notes});
            }

            if (sleep.tags) {
                tags = sleep.tags.split(',');
                data.tags = _.map(tags, function (current_tag){
                    return parseInt(current_tag, 10);
                });
            }
            return data;
        }

        $scope.submitDay = function() {
            var sleep = _getSleep();

            $http.post('/api/logs/', sleep);
        };

        function _init(){
            var today = moment(),
                params = $state.params;

            if (params.year && params.month && params.day) {
                _date = moment({
                    year:  params.year,
                    month: params.month - 1, // moment considers Jan == 00
                    day:   params.day
                });
            } else {
                _date = moment(); // today
            }
            
            eventTypeService.getEvents().then(function (events) {
                 _events = events;
                console.log(_events);
            });

            tagsService.getTags().then(function (tags) {
                $scope.tags = tags;
                console.log(tags);
            });
        }

        _init();
    }
]);