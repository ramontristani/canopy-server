'use strict';

var express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, cookieParser = require('cookie-parser')
	, session = require('express-session')
	, swig = require('swig')
	, minifier = require('html-minifier')
	, morgan = require('morgan')
	, jwt = require('jwt-simple')
	, config = require('./config')
	, userRepository = require('../server/modules/api/user/repository');

console.log('- Initializing Express application server');
module.exports = function (database) {
	var application = express();

	application.set('mediapath', __dirname.replace('startup', 'client/media/content'));
	application.engine('html', swig.renderFile);
	application.set('views', __dirname.replace('startup', 'server/views'));
	application.set('view engine', 'html');
	application.set('view cache', false);

	if (config.server.minification.minifyrenders) {
		application.use(function (req, res, next) {
			res.oldRender = res.render;
			res.render = function (view, options) {
				this.oldRender(view, options, function (err, html) {
					if (err) throw err;
					html = minifier.minify(html, config.server.minification.options);
					res.send(html);
				});
			};
			next();
		});
	}

	if ('dev' === config.server.deploymenttype) {
		application.use(morgan(config.server.deploymenttype));
	}

	application.use(express.static(__dirname.replace('startup', 'client')));
	application.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	application.use(bodyParser.json({ limit: '75mb', extended: true }));
	application.use(methodOverride());
	application.use(cookieParser(config.keys.cookies));
	application.use(session({ secret: config.keys.sessions, resave: true, saveUninitialized: true }));

	application.use(function (request, response, next) {
		if (request.url.indexOf('api/secure/') > -1) {
			var token = request.headers['authorization'].replace('Bearer ', '');
			userRepository.verifyAccessToken(token, function (error, valid) {
				if (error) {
					response.status(400);
					return next({
						error: error.message
					});
				}
			});
		}

		next();
	});

	if (config.server.logroutes) {
		console.log('- Saving requests to the database log collection');
		var logRepository = require('../server/modules/api/log/repository')
			, Log = require('../server/modules/schemas').Log;
		application.use(function (request, response, next) {
			var data = {
				data: request.headers,
				logtype: Log.logTypes().resourceRequest
			};

			logRepository.log(config.database.diskdb.setdefault ? database : null, data, function (error, result) {
				if (error) {
					console.log('*****Error loging request to the database');
				}
				next();
			});
		});
	}

	if (config.server.enablecors) {
		application.all('/*', function (request, response, next) {
			response.header("Access-Control-Allow-Origin", "*");
			response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			response.header('Access-Control-Allow-Headers', 'Content-type,Content-Length,Authorization,Accept,X-Access-Token,X-Key,X-Requested-With');

			if (request.method == 'OPTIONS') {
				request.status(200).end();
			} else {
				next();
			}
		});
	}

	console.log('- Express application successfully configured');

	return application;
}