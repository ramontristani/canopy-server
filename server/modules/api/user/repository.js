'use strict';

var bcrypt = require('bcrypt')
	, config = require('../../../../startup/config')
	, clientAccount = config.accounts.client;

module.exports = {
	createDefaultClientAccount: function(diskdb, done) {
		if (!diskdb) {
			var User = require('../../schemas').User;
			
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
		} else {
			try {
				diskdb.loadCollections(['users']);
				var user = diskdb.users.findOne({ email: clientAccount.email });
				
				if (user) {
					return done(null, {
						message: '- Reusing existing client account: ',
						document: user
					});
				} else {
					bcrypt.genSalt(config.crypto.swf, function(error, salt) {
						if (error) {
							throw error;
						}
						
						bcrypt.hash(clientAccount.secret, salt, function(error, hash) {
							if (error) {
								throw error;
							}
							
							clientAccount.secret = hash;
							user = diskdb.users.save(clientAccount);
							done(null, {
								message: '- Successfully created client user account: ',
								document: user
							});
						});
					});
				}
				
			} catch (e) {
				return done(e);
			}
		}
	} 
};