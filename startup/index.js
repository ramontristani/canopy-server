'use strict';

var config = require('./config')
	, assets = require('./assets')
	, db = require('./db')
	, express = require('./express')
	, _ = require('lodash');

module.exports = {
	server: function(done) {		
		db(function(database) {
			done({
				db: database,
				app: express(database),
				config: config,
				assets: assets
			});
		});
	}
};