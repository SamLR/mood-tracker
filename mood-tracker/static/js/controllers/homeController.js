/* global angular, moment */

angular.module('moodTracker').controller('homeController', [
    '$scope', '$http',
    function ($scope, $http) {
        'use strict';
        $scope.sleep = {
            event_type: 2,
        };
        
        $scope.submitSleep = function() {
            var sleep = $scope.sleep,
                start  = moment(sleep.start).format(),
                end    = moment(sleep.end).format(),
                data   = {
                    // TODO: this should be programmatically figured out
                    user: 1,
                    event_type: 2,
                    // Actual data
                    start:  start,
                    end:    end,
                    rating: parseInt(sleep.rating, 10)
                },
                tags;

            if (sleep.notes) {
                data.data = JSON.stringify({notes: sleep.notes});
            }

            if (sleep.tags) {
                tags = sleep.tags.split(',');
                data.tags = _.map(tags, function (current_tag){
                    return parseInt(current_tag, 10);
                });
            }

            $http.post('api/logs/', data);
        };
    }
]);