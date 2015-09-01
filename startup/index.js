'use strict';

/**
 * Declarations and depencencies
 */
var config = require('./config')
	, assets = require('./assets')
	, db = require('./db')
	, express = require('./express')
	, mail = require('./mail')
	, _ = require('lodash')
	, http = require('http')
	, io = require('socket.io');

module.exports = {
	server: function(done) {
		db(function(error, database) {
			if (error) {
				return console.log(error);
			}
			
			var app = express(database)
				, server = http.Server(app)
				, transport = mail();
			
			var result = {
				app: app,
				http: server,
				db: database,
				config: config,
				assets: assets,
				mailTransport: transport
			};
			
			if (config.server.socketsenabled) {
				result.io = io(server);
			}
			
			done(null, result);
		});
	}
};