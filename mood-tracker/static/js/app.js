/*
 * Root point for angular app
 */

angular.module('moodTracker', ['ngRoute', 'ui.bootstrap'])

.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}])

.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}])

.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'static/partials/home.html',
        controller: 'homeController'
    });

    $routeProvider.when('/event/:id', {
        templateUrl: 'static/partials/home.html',
        controller: 'eventController'
    });
}]);