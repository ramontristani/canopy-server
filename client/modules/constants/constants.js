(function() {
	'use strict';
	
	var constants = angular.module('main.constants', []);
	
	constants.factory('constantsFactory', [function() {
		return {
			endpoints: {
				login: '/api/v1/users/authentication'
			}
		};
	}]);
})();