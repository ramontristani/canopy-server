'use strict';

var express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, cookieParser = require('cookie-parser')
	, session = require('express-session')
	, swig = require('swig')
	, morgan = require('morgan')
	, config = require('./config');

console.log('- Initializing Express application server');
module.exports = function() {
	var application = express();
	
	application.set('mediapath', __dirname.replace('startup', 'client/media/content'));
	application.engine('html', swig.renderFile);
	application.set('views', __dirname.replace('startup', 'server/views'));
	application.set('view engine', 'html');
	application.set('view cache', false);
	
	if ('dev' === config.server.deploymenttype) {
		application.use(morgan(config.server.deploymenttype));
	}
	
	application.use(express.static(__dirname.replace('startup', 'client')));
	application.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	application.use(bodyParser.json({ limit: '75mb', extended: true }));
	application.use(methodOverride());
	application.use(cookieParser(config.keys.cookies));
	application.use(session({ secret: config.keys.sessions, resave: true, saveUninitialized: true }));
	
	console.log('- Express application successfully configured');
	
	return application;
}