/*
 * Root point for angular app
 */

angular.module('moodTracker', ['ui.select','ui.router', 'ui.bootstrap', 'ngSanitize'])

// Set user info
.value('userName', _user.userName)
.value('userId',   _user.userId)

// Don't get confused with Django templating stuff
.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}])

// Use html push history
.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}])

// Tell angular to use Django's CSRF cookies
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])

// If in doubt redirect to...
.config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}])

// Our actual states
.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
    .state('today', {
        url : '/',
        views: {
            menu: {
                templateUrl: '/static/partials/menu.html',
                controller: 'menuController'
            },
            main: {
                templateUrl: '/static/partials/day.html',
                controller: 'dayController'
            } 
        }
    })
    .state('log', {
        url: '/log/:year/:month/:day/',
        views: {
            menu: {
                templateUrl: '/static/partials/menu.html',
                controller: 'menuController'
            },
            main: {
                templateUrl: '/static/partials/day.html',
                controller: 'dayController'
            }
        }
    });
}]);