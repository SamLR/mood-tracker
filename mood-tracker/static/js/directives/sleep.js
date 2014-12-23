angular.module('moodTracker')
.directive('mooSleep',function () {
    return {
        restrict: 'E',
        scope: {
            sleepObj: '=',
            tags: '='
        },
        templateUrl: '/static/partials/directives/sleep.html'
    };
});