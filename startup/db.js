'use strict';
var config = require('./config');

console.log('- Initializing database connection');
module.exports = function() {
	var db;
	
	if (config.database.diskdb.setdefault) {
		var diskdb = require('diskdb')
			, path = __dirname.replace('startup', config.database.diskdb.path);
			
		db = diskdb.connect(path, config.database.diskdb.collections);
		console.log('- Successfully connected to DiskDB: ' + path);
	} else if (config.database.mongodb.setdefault) {
		var mongoose = require('mongoose');
		db = mongoose.connect(config.database.mongodb.connection);
		console.log('- Successfully connected to MongoDB: ' + config.database.mongodb.connection);
	}
	
	return db;
};