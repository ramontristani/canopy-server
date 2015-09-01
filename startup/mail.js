'use strict';

var nodemailer = require('nodemailer')
	, util = require('util')
	, config = require('./config');
	
var messages = {
	init: '- Initializing mail configuration',
	mailDisabled: '- Mail is disabled for this application',
	invalidAuth: '- *** Invalid mail credentials provided for %s ***'
};

console.log(messages.init);
module.exports = function() {
	var transport;
	if (config.mail.enable) {
		if (config.mail.settings.service.length > 0) {
			if (!(config.mail.settings.auth.user.length > 0) || !(config.mail.settings.auth.pwd.length > 0)) {
				return console.log(util.format(messages.invalidAuth, config.mail.settings.service));
			}
			
			transport = nodemailer.createTransport(config.mail.settings);
		}
		
		if (!transport) {
			transport = nodemailer.createTransport();
		}
	}
	
	if (!transport) {
		console.log(messages.mailDisabled);
	}
	
	return transport;
};