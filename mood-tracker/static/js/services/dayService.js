/* global angular, moment, _ */

angular.module('moodTracker')
.factory('dayService',['$http', '$q', 'eventTypeService', 'tagsService', 'userId',
    function ($http, $q, eventTypeServicePromise, tagsServicePromise, userId) {

    var _apiRoot = '/api/logs/',
        _dateFmt = 'YYYY-MM-DD',
        _dayCache = {},
        _tagService, _eventService; // Will hold the actual functions for these services...

    function _dayKey (day) {
        return moment(day).format(_dateFmt);
    }

    function _enrichDay (dayLog) {
        var res = {};
        _.each(dayLog, function (eventEntry){
            var tags = [];

            // Replace tag & event ids with their respective objects
            _.each(eventEntry.tags, function (tag) {
                tags.push(_tagService.getTagById(tag.id));
            });

            eventEntry.tags = tags;
            eventEntry.event_type = _eventService.getEventByid(eventEntry.event_type);
            res[eventEntry.event_type.slug] = eventEntry;
        });
        return res;
    }

    function _serialiseEvent (eventObj) {
        var res = _.cloneDeep(eventObj);
        res.user = userId;
        res.event_type = res.event_type.id;
        res.tags = _.pluck(res.tags, 'id');
        return res;
    }

    function _getDayURL (day) {
        // TODO check for utils to generate query strings
        var beforeDay = moment(day).add(1, 'day'),
            queryString = '?ends_after='  + _dayKey(day) + '&ends_before=' + _dayKey(beforeDay);
        return _apiRoot + queryString;
    }

    function _getDay (day) {
        var dayKey = _dayKey(day);

        if ( _dayCache[dayKey] ) {
            return _dayCache[dayKey];
        } 

        return $http.get(_getDayURL(day))
            .then(function (results) { // day found, return 
                var day = _enrichDay(results.data),
                    defered = $q.defer();

                // cache the promise
                _dayCache[dayKey] = defered.promise;
                defered.resolve(day);

                return day;
            });
    }

    function _addDay (day) {
        var promises = [];
        _.each(day, function (event) {
            var dayKey = _dayKey(event.end),
                eventSlug = event.event_type.slug,
                dataToSend = _serialiseEvent(event);
            
            if (event.id) {
                promises.push($http.put(_apiRoot + event.id, dataToSend));
            } else {
                promises.push($http.post(_apiRoot, dataToSend));
            }
        });
        return $q.all(promises)
            .then(function (results) {
                var days = _.pluck(results, 'data');
                return _enrichDay(days);
            });
    }

    function _init () {
        var tagPromise   = tagsServicePromise.then(function (tt) { _tagService = tt; }),
            eventPromise = eventTypeServicePromise.then(function (ee) { _eventService = ee; });

        return $q.all([tagPromise, eventPromise])//
            .then(function (results) {
                _getDay(moment()); // preload today
                return {
                    addDay: _addDay,
                    getDay: _getDay
                };
            });
    }

    return _init();
}]);