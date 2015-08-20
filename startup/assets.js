'use strict';

console.log('- Initializing assets');
var config = require('./config');

var assets = function() {
	var result = {
		css: [
			{ path: '/vendor/bootstrap/dist/css/bootstrap.min.css', ownerpartial: 'index' },		
			{ path: '/styles/default.css', ownerpartial: 'index' }
		],
		js: [
			{ path: '/vendor/lodash/lodash.min.js', ownerpartial: 'all' },		
			{ path: '/vendor/jquery/dist/jquery.min.js', ownerpartial: 'all' },		
			{ path: '/vendor/bootstrap/dist/js/bootstrap.min.js', ownerpartial: 'all' },		
			{ path: '/vendor/angular/angular.js', ownerpartial: 'all' },		
			{ path: '/vendor/angular-route/angular-route.js', ownerpartial: 'all' },
			{ path: '/modules/constants/constants.js', ownerpartial: 'all' },		
			{ path: '/modules/main.js', ownerpartial: 'index' },		
			{ path: '/modules/layout/layout.js', ownerpartial: 'index' },
			{ path: '/modules/home/home.js', ownerpartial: 'index' },
			{ path: '/modules/about/about.js', ownerpartial: 'index' },
			{ path: '/modules/authentication/authentication.js', ownerpartial: 'all' }
		]
	};
	
	if (config.server.socketsenabled) {
		result.js.unshift({ path: '/socket.io/socket.io.js', ownerpartial: 'all' });
	}
	
	return result;
};

module.exports = assets();