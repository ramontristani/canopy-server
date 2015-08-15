(function() {
	'use strict';
	var main = angular.module('main', ['ngRoute', 'main.layout']);
	
	main.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });

        $routeProvider.when('/home', {
            templateUrl: '/modules/home/partials/home-partial.html',
            controller: 'HomeController'
        }).when('/about', {
            templateUrl: '/modules/about/partials/about-partial.html',
            controller: 'AboutController'
        });

        $locationProvider.html5Mode(true);
    }]);
	
	main.run(['$window', '$rootScope', function($window, $rootScope) {
        $window.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);

        $window.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

        }, false);

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            window.scrollTo(0, 0);
        });
    }]);
})();