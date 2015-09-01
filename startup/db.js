'use strict';
var userRepository = require('../server/modules/api/user/repository')
	, config = require('./config')
	, _ = require('lodash')
	, util = require('util');
	
var messages = {
	init: '- Initializing database connection',
	errorMessage: '- **** Error creating default default accounts ****',
	multProvidersMessage: '- **** Error in database configuration. Multiple providers are not supported ****',
	noProvidersMessage: '- **** Error in database configuration. No database provider selected ****',
	successfulConnectionTo: '- Successfully connected to %s: %s',
	defaultAccountCreation: '- Creating default accounts from config...'
};

console.log(messages.init);
module.exports = function(done) {
	var db;
		
	if (config.database.diskdb.setdefault && config.database.mongodb.setdefault) {
		return done(new Error(messages.multProvidersMessage));
	}
	
	if (!config.database.diskdb.setdefault && !config.database.mongodb.setdefault) {
		return done(new Error(messages.noProvidersMessage));
	}
	
	if (config.database.diskdb.setdefault) {
		var diskdb = require('diskdb')
			, path = __dirname.replace('startup', config.database.diskdb.path);
			
		db = diskdb.connect(path, config.database.diskdb.collections);
		console.log(util.format(messages.successfulConnectionTo, 'DiskDB', path));
		console.log(messages.defaultAccountCreation);
		userRepository.createDefaultAccounts(db, function(error, result) {
			console.log(!error && result
				? result.message
				: messages.errorMessage);
		});
		
		done(null, db);
		
	} else if (config.database.mongodb.setdefault) {
		var mongoose = require('mongoose');
		db = mongoose.connect(config.database.mongodb.connection);
		console.log(util.format(messages.successfulConnectionTo, 'MongoDB', config.database.mongodb.connection));
		console.log(messages.defaultAccountCreation);
		
		userRepository.createDefaultAccounts(null, function(error, result) {
			console.log(!error && result
				? result.message 
				: messages.errorMessage);
		});
		
		done(null, db);
	}
};