'use strict';

var User = require('../../schemas').User
	, clientAccount = require('../../../../startup/config').accounts.client;

module.exports = {
	createDefaultClientAccount: function(done) {
		User.findOne({ email: clientAccount.email }, function(error, user) {
			if (error) {
				return done(error);	
			}
			
			if (user) {
				return done(null, {
					message: '- Reusing existing client account: ',
					document: user
				});
			}
			
			var client = new User(clientAccount);
			client.save(function(error, doc) {
				if (error) {
					return done(error);	
				}
				
				done(null, {
					message: '- Successfully created client user account: ',
					document: doc
				});
			});
		});
	} 
};