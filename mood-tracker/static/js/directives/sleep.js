angular.module('moodTracker')
.directive('mooSleep',function () {
    return {
        restrict: 'E',
        scope: {
            sleepObj: '='
        },
        templateUrl: '/static/partials/directives/sleep.html'
    };
});