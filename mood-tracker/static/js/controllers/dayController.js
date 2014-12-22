/* global angular, moment */

angular.module('moodTracker').controller('dayController', [
    '$scope', '$http', '$state',
    function ($scope, $http, $state) {
        'use strict';

        var _date = null;

        $scope.sleep = {};
        
        $scope.submitSleep = function() {
            var sleep = $scope.sleep,
                data = {
                    user: 1,
                    event_type: 1,
                    rating: parseInt(sleep.rating, 10)
                },
                start = sleep.start.split(':'),
                end   = sleep.end.split(':'),
                tags;

            // TODO sort out sleep from yesterday
            data.start = _date.day(-1).hour(start[0]).minute(start[1]).format();
            data.end   = _date.hour(end[0]).minute(end[1]).format();

            if (sleep.notes) {
                data.data = JSON.stringify({notes: sleep.notes});
            }

            if (sleep.tags) {
                tags = sleep.tags.split(',');
                data.tags = _.map(tags, function (current_tag){
                    return parseInt(current_tag, 10);
                });
            }

            $http.post('/api/logs/', data);
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
            console.log(_date.format());
        }

        _init();
    }
]);