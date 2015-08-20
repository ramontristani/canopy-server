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
            controller: 'AboutController',
            resolve: {
                authenticated: function(authenticationFactory, $route) {
                    return authenticationFactory.authenticated();
                }
            }
        }).when('/sign-in', {
            templateUrl: '/modules/authentication/partials/authentication-partial.html',
            controller: 'AuthenticationController',
            resolve: {
                anonymous: function(authenticationFactory, $route) {
                    return authenticationFactory.unauthenticated();
                }
            }
        });

        $locationProvider.html5Mode(true);
    }]);
	
	main.run(['$window', '$rootScope', '$injector', function($window, $rootScope, $injector) {
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
        
        $injector.get("$http").defaults.transformRequest = function(data, headersGetter) { 
            if ($window.oauth) {
                headersGetter()['Authorization'] = "Bearer " + $window.oauth.token;
            } 
            
            if (data) { 
                return angular.toJson(data); 
            }
        }
    }]);
})();