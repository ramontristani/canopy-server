'use strict';

var config = require('./config')
	, assets = require('./assets')
	, db = require('./db')
	, express = require('./express')
	, _ = require('lodash')
	, http = require('http')
	, io = require('socket.io');

module.exports = {
	server: function(done) {		
		db(function(database) {
			var app = express(database)
				, server = http.Server(app);
			
			var result = {
					app: app,
					http: server,
					db: database,
					config: config,
					assets: assets
				};
			
			
			if (config.server.socketsenabled) {
				result.io = io(server);
			}
			
			done(result);
		});
	}
};