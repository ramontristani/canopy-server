(function() {
	'use strict';
	
	var authentication = angular.module('main.authentication', ['main.constants']);
	
	authentication.factory('authenticationFactory', ['$window', '$location', '$http', '$q', 'constantsFactory', function($window, $location, $http, $q, constantsFactory) {
		return {
			login: function(credentials) {
				var deferred = $q.defer();			
				$http.post(constantsFactory.endpoints.login, credentials)
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function(data) {
						console.log(data);
						deferred.resolve(data);
					});
					
				return deferred.promise;
			},
			
			oauth: function() {
				return JSON.parse($window.localStorage.getItem('oauth'));
			},
			
			persist: function(data, done) {
				$window.localStorage.setItem('oauth', JSON.stringify(data));
				done();
			},
			
			authenticated: function() {
				var deferred = $q.defer();
				var authInfo = JSON.parse($window.localStorage.getItem('oauth'));
				
				if (authInfo && authInfo.token) {
					deferred.resolve();
					return deferred.promise;
				} else {
					$location.path('/sign-in')
				}
			},
			
			unauthenticated: function() {
				var deferred = $q.defer();
				var authInfo = JSON.parse($window.localStorage.getItem('oauth'));
				
				if (!authInfo) {
					deferred.resolve();
					return deferred.promise;
				} else {
					$location.path('/home')
				}
			}
		};
	}]);
	
	authentication.controller('AuthenticationController', ['$scope', '$location', 'authenticationFactory', function($scope, $location, authenticationFactory) {
		$scope.onSignIn = function(e) {
			e.preventDefault();
			authenticationFactory.login($scope.credentials).then(function(data) {
				if (data.error) {
					return console.log(data.error);
				}
				
				authenticationFactory.persist(data, function() {
					$location.path('/home');
				})
			});
		};
		
		function init() {}
		
		init();
	}]);
	
})();