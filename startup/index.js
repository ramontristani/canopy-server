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

/**
 * Application startup module
 * @exports	An application startup singleton
 */
module.exports = {
	/**
	 * Server function returns a decorated application server singleton
	 * @param done: Callback invoked when all initialization operations have been completed
	 * @return A server singleton object via callback
	 */
	server: function(done) {
		/**
		 * Database confuguration module is executed to get a reference to DiskDB or MongoDB
		 * @param callback:	Returns a database reference
		 */		
		db(function(error, database) {
			if (error) {
				return console.log(error);
			}
			
			/**
			* Creating express and http instances
			*/
			var app = express(database)
				, server = http.Server(app)
				, transport = mail();
			
			/**
			* Constructed application server singleton
			* @property app: References an ExpressJS instance
			* @property http: References the http server created from the ExpressJS instance
			* @property db: References the configured application database connection
			* @property config: Contains a reference to the main "startup/config.js" file
			* @property assets: Contains a reference to the main "startup/assets.js" file
			*/
			var result = {
				app: app,
				http: server,
				db: database,
				config: config,
				assets: assets,
				mailTransport: transport
			};
			
			/**
			* Enables web sockets when enabled in main config file
			*/
			if (config.server.socketsenabled) {
				result.io = io(server);
			}
			
			/**
			* Executes callback function by returning server singleton to the caller
			* @param result: A configured server singleton
			*/
			done(null, result);
		});
	}
};