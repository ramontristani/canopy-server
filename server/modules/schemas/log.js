var mongoose = require('mongoose');
	
/**
 * Log model schema
 */
var Schema = mongoose.Schema({
	logtype: { type: String, required: true },
	data: { type: Object, required: true },
	active: { type: Boolean, default: true },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Schema.statics.logTypes = function() {
	return {
		resourceRequest: 'RESOURCE ENDPOINT REQUEST',
		databaseRequest: 'DATABASE REQUEST',
		error: 'ERROR'
	};
};

module.exports = mongoose.model('Log', Schema, 'logs');