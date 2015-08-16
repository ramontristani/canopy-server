'use strict';

var express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, cookieParser = require('cookie-parser')
	, session = require('express-session')
	, swig = require('swig')
	, minifier = require('html-minifier')
	, morgan = require('morgan')
	, config = require('./config');

console.log('- Initializing Express application server');
module.exports = function () {
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
	
	application.all('/*', function(request, response, next) {
		response.header("Access-Control-Allow-Origin", "*");
		response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		response.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
		
		if (request.method == 'OPTIONS') {
			request.status(200).end();
		} else {
			next();
		}
	});
	
	//application.all('/api/v1/*', [require('../server/modules/api/validation')]);

	console.log('- Express application successfully configured');

	return application;
}