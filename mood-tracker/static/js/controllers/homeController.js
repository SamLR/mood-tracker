/* global angular, moment */

angular.module('moodTracker').controller('homeController', [
    '$scope', '$http',
    function ($scope, $http) {
        'use strict';

        $scope.sendEvent = function() {
            $http.put('api/logs/20', {
                user: 1,
                event_type: 1,
                start: moment([2010, 1, 1, 6, 6, 6]),
                end:   moment([2010, 2, 2, 10, 10, 10]),
                data: JSON.stringify({something: 'completely different (CHEESE!)'}),
                tags: [1,2]
            });
        };
    }
]);