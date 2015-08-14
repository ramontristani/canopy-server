'use strict';

var _ = require('lodash');

module.exports = {
	register: function(server) {
		server.app.route('/').get(function(request, response) {
			var css = _.pluck(_.filter(server.assets.css, function(asset) {
					return asset.ownerpartial === 'index' 
						|| asset.ownerpartial === 'all' 
				}), 'path');
				
			var js = _.pluck(_.filter(server.assets.js, function(asset) {
					return asset.ownerpartial === 'index' 
						|| asset.ownerpartial === 'all' 
				}), 'path');
				
			var options = {
				title: server.config.general.title,
				description: server.config.general.description,
				year: new Date().getFullYear(),
				css: css,
				js: js
			};
			
			response.render('index', options);
		});
		
		// Splat for html5Mode angular refreshes
		server.app.all('/*', function(request, response) {
			return response.redirect(request.protocol + '://' + request.get('Host') + '/#' + request.url)
		});
	}
};