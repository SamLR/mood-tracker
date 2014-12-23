/* global angular, _ */

angular.module('moodTracker')
.factory('tagsService',['$http', function($http) {

    var _apiRoot = '/api/tags/';

    function _slugify (slug) {
        return slug.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
    }

    return $http.get(_apiRoot)
        .then(function (results) {
            var _tags   = results.data,
                _byId   = _.indexBy(_tags, 'id'),
                _bySlug = _.indexBy(_tags, 'slug');

            var _addTag = function (tagName) {
                var dataToSend = {
                        name: tagName,
                        slug: _slugify(tagName)
                    };

                return $http.post(_apiRoot, dataToSend)
                    .then(function (results) {
                        var tag = results.data;
                        _tags.push(tag);
                        _byId[tag.id] = tag;
                        _bySlug[tag.slug] = tag;
                        return tag;
                    });
            };

            return {
                addTag:       _addTag,
                getTags:      function()     { return _tags;         },
                getTagById:   function(id)   { return _byId[id];     },
                getTagBySlug: function(slug) { return _bySlug[slug]; }
            };
        });
}]);