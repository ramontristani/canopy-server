'use strict';

var userRepository = require('./repository');

module.exports = {
	register: function(server) {
		var db = server.config.database.diskdb.setdefault
			? server.db
			: null;
			
		server.app.route('/api/v1/users/authentication')
			.get(function(request, response) {
				response.send('Nice Try...');
			}).post(function(request, response) {
				userRepository.authenticate(db, request.body, function(error, token) {
					if (error) {
						return response.status(401).json({
							error: error.message
						});
					}
					
					response.status(200).json({
						token: token
					});
				});
		});
	}
};