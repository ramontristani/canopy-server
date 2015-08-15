(function() {
	'use strict';
	
    var home = angular.module('main.home', []);

    home.controller('HomeController', ['$scope', function($scope) {
        function init() {
            $scope = _.assign($scope, {
                viewTitle: 'Home Page',
                viewSubtitle: 'Neat home page. Place your default goodness here'
            });
        }

        init();
    }]);
})();