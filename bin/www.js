'use strict';

var startup = require('../startup')
	, util = require('util');

module.exports = {
	start: function() {
		var server = startup.server();startup
		
		// TODO: Reference server modules and register them here (Routes, API's, etc.)
		
		server.app.listen(server.config.server.port, function() {
			console.log('\n******************************************************************');
			console.log(util.format('* %s is now listening to requests http://%s:%s',
				'Canopy Server',
				'localhost',
				server.config.server.port));
			console.log('******************************************************************');
			console.log('Build something great!');
		});
	}
};