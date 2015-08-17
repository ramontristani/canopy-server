'use strict';

var defaultPageRoutes = require('./default')
	, userApiRoutes = require('./api/user/endpoints');

module.exports = {
	register: function(server) {
		defaultPageRoutes.register(server);
		userApiRoutes.register(server);
		
		// Splat for html5Mode angular refreshes
		server.app.all('/*', function(request, response) {
			return response.redirect(request.protocol + '://' + request.get('Host') + '/#' + request.url)
		});
	}
};