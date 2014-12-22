angular.module('moodTracker')
.factory('eventTypeService',['$http', function ($http) {

    var _apiRoot = '/api/events/';

    function _getEvents () {
        return $http.get(_apiRoot, {cache: true})
                    .then(function (results) {
                        var res = _.indexBy(results.data, 'slug');
                        return res;
                    });
    }

    _getEvents();

    return {
        getEvents: _getEvents
    };
}]);