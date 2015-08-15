(function() {
	'use strict';
	
    var about = angular.module('main.about', []);

    about.controller('AboutController', ['$scope', function($scope) {
        function init() {
            $scope = _.assign($scope, {
                viewTitle: 'About Page',
                viewSubtitle: 'This is where you talk about how awesome you are ;-)'
            });
        }

        init();
    }]);
})();