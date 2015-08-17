'use strict';

var bcrypt = require('bcrypt')
	, _ = require('lodash')
	, jwt = require('jwt-simple')
	, moment = require('moment')
	, config = require('../../../../startup/config')
	, clientAccount = config.accounts.client;

var messages = {
	accountNotFound: 'Account not found',
	accountLocked: 'Account locked',
	invalidCredentials: 'Invalid account credentials',
	invalidAccessToken: 'Invalid access token',
	expiredAccessToken: 'Expired access token'
};

var compareSecret = function (value, original, next) {
	bcrypt.compare(value, original, function (error, match) {
		if (error) {
			return next(error);
		}

		next(null, match);
	});
};

module.exports = {
	authenticate: function (diskdb, credentials, done) {
		var tokenExpiration = moment().add(config.tokens.daysexpires, 'days').valueOf();
		console.log(tokenExpiration);
		if (!diskdb) {
			var User = require('../../schemas').User;
			User.findOne({ email: credentials.email }, function (error, account) {
				if (error || !account) {
					return done(error || new Error(messages.accountNotFound));
				}

				if (account.locked) {
					return done(new Error(messages.accountLocked));
				}

				account.compareSecret(credentials.secret, function (error, match) {
					if (error || !match) {
						account.attempts = account.attempts + 1;
						if (account.attempts === config.accounts.maxloginattempts) {
							account.locked = true;
						}

						account.save(function (error, account) {
							return done(error || new Error(messages.invalidCredentials));
						});
					}

					account.lastlogin = Date.now();
					account.save(function (error, account) {
						var tokenData = _.assign({
							expires: tokenExpiration,
							iss: config.tokens.issuer,
							sub: config.tokens.subject
						}, {
								profile: {
									firstname: account.firstname,
									lastname: account.lastname,
									email: account.email,
									avatar: account.avatar,
									lastlogin: account.lastlogin
								}
							});

						done(null, jwt.encode(tokenData, config.tokens.secret, config.tokens.jwtencoding));
					});

				});

			});
		} else {
			try {
				diskdb.loadCollections(['users']);
				var account = diskdb.users.findOne({ email: credentials.email });
				if (!account) {
					return done(new Error(messages.accountNotFound));
				}

				if (account.locked) {
					return done(new Error(messages.accountLocked));
				}

				compareSecret(credentials.secret, account.secret, function (error, match) {
					if (error || !match) {
						account.attempts = account.attempts + 1;
						if (account.attempts === config.accounts.maxloginattempts) {
							account.locked = true;
						}

						diskdb.users.update({ _id: account._id }, account, { multi: false, upsert: false });
						return done(new Error(messages.invalidCredentials));
					}

					account.lastlogin = Date.now();
					diskdb.users.update({ _id: account._id }, account, { multi: false, upsert: false });

					var tokenData = _.assign({
						expires: tokenExpiration,
						iss: config.tokens.issuer,
						sub: config.tokens.subject
					}, {
							profile: {
								firstname: account.firstname,
								lastname: account.lastname,
								email: account.email,
								avatar: account.avatar,
								lastlogin: account.lastlogin
							}
						});

					done(null, jwt.encode(tokenData, config.tokens.secret, config.tokens.jwtencoding));
				});

			} catch (error) {
				done(error);
			}
		}
	},

	verifyAccessToken: function (token, done) {
		try {
			if (!token || !(token.length > 0)) {
				return done(new Error(messages.invalidAccessToken));
			}

			var decodedToken = jwt.decode(token, config.tokens.secret);

			if (decodedToken.expires < Date.now()
				|| decodedToken.iss !== config.tokens.issuer
				|| decodedToken.sub !== config.tokens.subject) {

				return done(new Error(messages.expiredAccessToken));
			}

			done(null, true);
		}
		catch (error) {
			done(new Error(messages.invalidAccessToken))
		}
	},

	createDefaultClientAccount: function (diskdb, done) {
		if (!diskdb) {
			var User = require('../../schemas').User;

			User.findOne({ email: clientAccount.email }, function (error, user) {
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
				client.save(function (error, doc) {
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
					bcrypt.genSalt(config.crypto.swf, function (error, salt) {
						if (error) {
							throw error;
						}

						bcrypt.hash(clientAccount.secret, salt, function (error, hash) {
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