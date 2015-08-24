'use strict';

var _ = require('lodash')
	, bowerMains = require('main-bower-files');

var vendorScripts = function (config) {
	var localVendorPaths = bowerMains('**/*.js')
		, result = [];

	_.each(localVendorPaths, function (script) {
		var start = script.indexOf('/vendor')
			, end = script.length;

		result.push(script.slice(start, end));
	});

	if (config.server.socketsenabled) {
		result.unshift('/socket.io/socket.io.js');
	}

	return result;
};

var customScripts = function (assets) {
	return _.pluck(_.filter(assets.js, function (asset) {
		return asset.ownerpartial === 'index'
			|| asset.ownerpartial === 'all'
	}), 'path');
};

var aggregateScripts = function (vendor, custom) {
	var result = vendor;
	_.each(custom, function (path) {
		result.push(path);
	});

	return result;
};

var cssSources = function (assets) {
	return _.pluck(_.filter(assets.css, function (asset) {
		return asset.ownerpartial === 'index'
			|| asset.ownerpartial === 'all'
	}), 'path');
};

module.exports = {
	register: function (server) {
		server.app.route('/').get(function (request, response) {
			var js = aggregateScripts(vendorScripts(server.config), customScripts(server.assets))
				, css = cssSources(server.assets);

			_.each(customScripts, function (path) {
				js.push(path);
			});

			var options = {
				title: server.config.general.title,
				description: server.config.general.description,
				year: new Date().getFullYear(),
				css: css,
				js: js
			};

			response.render('index', options);
		});
	}
};