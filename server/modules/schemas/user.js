var mongoose = require('mongoose')
	, bcrypt = require('bcrypt')
	, swf = require('../../../startup/config').crypto.swf;
	
/**
 * User model schema
 */
var Schema = mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	secret: { type: String, required: true },
	avatar: { type: String },
	lastlogin: { type: Date },
	attempts: { type: Number, required: true, default: 0 },
	locked: { type: Boolean },
	active: { type: Boolean },
	created: { type: Date },
	updated: { type: Date, default: Date.now }
});

/**
 * Pre-hashes secret prior to saving
 */
Schema.pre('save', function(next) {
	var user = this;
	
	if (!user.isModified('secret')) {
		return next();
	}
	
	bcrypt.genSalt(swf, function(error, salt) {
		if (error) {
			return next(error);
		}
		
		bcrypt.hash(user.secret, salt, function(error, hash) {
			if (error) {
				return next(error);
			}
			
			user.secret = hash;
			next();
		});
	});
});

/**
 * Compares secret input against hashed user secret in the database
 */
Schema.methods.compareSecret = function(value, next) {
	bcrypt.compare(value, this.secret, function(error, match) {
		if (error) {
			return next(error);
		}
		
		next(null, match);
	});
};

module.exports = mongoose.model('User', Schema, 'users');