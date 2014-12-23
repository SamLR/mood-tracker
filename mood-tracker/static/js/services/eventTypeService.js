/* global angular, _ */

angular.module('moodTracker')
.factory('eventTypeService',['$http', function ($http) {

    var _apiRoot = '/api/events/';

    return $http.get(_apiRoot)
        .then(function (results) {
            var _eventTypes = results.data,
                _byId       = _.indexBy(_eventTypes, 'id'),
                _bySlug     = _.indexBy(_eventTypes, 'slug');

            return {
                getEvents:      function ()     { return _eventTypes;   },
                getEventByid:   function (id)   { return _byId[id];     },
                getEventBySlug: function (slug) { return _bySlug[slug]; }
            };
        });
}]);