'use strict';

var config = require('../../../../startup/config');

module.exports = {
	log: function(diskdb, data, done) {
		if (!diskdb) {
			var Log = require('../../schemas').Log;
			
			var logItem = new Log(data);
			logItem.save(function(error, log) {
				if (error) {
					return done(error);	
				}
				
				done(null, log);
			});			
		} else {
			try {
				diskdb.loadCollections(['logs']);
				
				data.created = data.updated = Date.now();
				data.active = true;
				
				var log = diskdb.logs.save(data);
				done(null, log);
			} catch (e) {
				return done(e);
			}
		}
	} 
};