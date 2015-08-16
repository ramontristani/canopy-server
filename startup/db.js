'use strict';
var userRepository = require('../server/modules/api/user/repository')
	, config = require('./config');

console.log('- Initializing database connection');
module.exports = function(done) {
	var errorMessage = '- **** Error creating default client account ****'
		, db;
	
	if (config.database.diskdb.setdefault) {
		var diskdb = require('diskdb')
			, path = __dirname.replace('startup', config.database.diskdb.path);
			
		db = diskdb.connect(path, config.database.diskdb.collections);
		console.log('- Successfully connected to DiskDB: ' + path);
		
		userRepository.createDefaultClientAccount(db, function(error, result) {
			console.log(!error && result
				? result.message + result.document.email
				: errorMessage);
		});
		
		done(db);
		
	} else if (config.database.mongodb.setdefault) {
		var mongoose = require('mongoose');
		db = mongoose.connect(config.database.mongodb.connection);
		console.log('- Successfully connected to MongoDB: ' + config.database.mongodb.connection);
		
		console.log('- Creating default client account...');
		
		userRepository.createDefaultClientAccount(null, function(error, result) {
			console.log(!error && result
				? result.message + result.document.email
				: errorMessage);
		});
		
		done(db);
	}
};