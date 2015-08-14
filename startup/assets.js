'use strict';

console.log('- Initializing assets');
module.exports = {
	css: [
		{
			path: '/vendor/bootstrap/dist/css/bootstrap.min.css',
			ownerpartial: 'index'
		},
		
		{
			path: '/styles/default.css',
			ownerpartial: 'index'
		}
	],
	
	js: [
		{
			path: '/vendor/lodash/lodash.min.js',
			ownerpartial: 'all'
		},
		
		{
			path: '/vendor/jquery/dist/jquery.min.js',
			ownerpartial: 'all'
		},
		
		{
			path: '/vendor/bootstrap/dist/js/bootstrap.min.js',
			ownerpartial: 'all'
		},
		
		{
			path: '/vendor/angular/angular.js',
			ownerpartial: 'all'
		},
		
		{
			path: '/vendor/angular-route/angular-route.js',
			ownerpartial: 'all'
		}
	]
};