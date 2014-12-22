angular.module('moodTracker')
.factory('tagsService',['$http', function($http) {

    var _apiRoot = '/api/tags/',
        _tags = {};


    function _getTags () {
        return $http.get(_apiRoot, {cache: true})
                    .then(function (results) {
                        _tags = _.indexBy(results.data, 'slug');
                        return _tags;
                    });
    }

    function _slugify (slug) {
        return slug.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
    }

    function _addTag (tagName) {
        var dataToSend = {
                name: tagName,
                slug: _slugify(tagName)
            },
            _onSuccess = function (results) {                
                var data = results.data;
                _tags[data.slug] = data;
                return data;
            };

        return $http.post(_apiRoot, dataToSend).then(_onSuccess);
    }

    _getTags();

    return {
        addTag:  _addTag,
        getTags: _getTags
    };
}]);