'use strict';

var startup = require('../startup')
	, modules = require('../server/modules')
	, util = require('util');

module.exports = {
	start: function() {
		startup.server(function(error, server) {
			if (error) {
				return console.log(error);
			}
			
			modules.register(server);
		
			server.http.listen(server.config.server.port, function() {
				console.log('\n******************************************************************');
				console.log(util.format('* %s is now listening to requests http://%s:%s',
					'Canopy Server',
					'localhost',
					server.config.server.port));
				console.log('******************************************************************');
				console.log('Build something great!');
				
				if ('dev' === server.config.server.deploymenttype 
					&& server.config.development.openbrowser) {
					
					var open = require('open');
					open(server.config.development.location, server.config.development.browser);
				}
			});
		});
	}
};