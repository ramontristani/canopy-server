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
			{ path: '/modules/main.js', ownerpartial: 'index' },		
			{ path: '/modules/constants/constants.js', ownerpartial: 'all' },
			{ path: '/modules/layout/layout.js', ownerpartial: 'index' },
			{ path: '/modules/home/home.js', ownerpartial: 'index' },
			{ path: '/modules/about/about.js', ownerpartial: 'index' },
			{ path: '/modules/authentication/authentication.js', ownerpartial: 'all' }
		]
	};
	
	return result;
};

module.exports = assets();