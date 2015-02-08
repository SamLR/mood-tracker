/* global angular, moment, _ */

angular.module('moodTracker')
.controller('menuController', ['$scope', '$state', function ($scope, $state) {
    var dateFmt = 'YYYY-MM-DD';

    function _zeroPrefix(value) {
        return value > 9 ? '' + value : '0' + value;
    }

    function _goToDate(dateObj) {
        $state.go('log', {
            year: dateObj.year(),
            // Month & day are zero-indexed
            month: _zeroPrefix(dateObj.month() + 1),
            day:   _zeroPrefix(dateObj.date())
        });
    }

    $scope.goToToday = function() {
        $state.go('today');
    };

    $scope.goToDate = function() {
        var date = moment($scope.logDate, dateFmt);
        _goToDate(date);
    };

    $scope.goToYesterday = function() {
        var date = moment();
        date.subtract(1, 'days');
        _goToDate(date);
    };

    function init(){
        var date = $state.params;
        // Init the logdate attribute
        if ( !_.isEmpty(date) ) {
            $scope.logDate = moment({
                    year:  date.year,
                    month: date.month - 1,
                    date:  date.day 
                }).format(dateFmt);
        } else {
            $scope.logDate = moment().format(dateFmt);
        }
    }

    init();
}]);