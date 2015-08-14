'use strict';

var config = require('./config')
	, assets = require('./assets')
	, db = require('./db')
	, express = require('./express');

module.exports = {
	server: function() {
		return {
			app: express(),
			db: db(),
			config: config,
			assets: assets
		};
	}
};