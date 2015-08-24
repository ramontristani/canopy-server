'use strict';

var _ = require('lodash')
	, bowerMains = require('main-bower-files');

module.exports = {
	vendorScripts: function (config) {
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
	},

	customScripts: function (assets) {
		return _.pluck(_.filter(assets.js, function (asset) {
			return asset.ownerpartial === 'index'
				|| asset.ownerpartial === 'all'
		}), 'path');
	},

	aggregateScripts: function (vendor, custom) {
		var result = vendor;
		_.each(custom, function (path) {
			result.push(path);
		});

		return result;
	},

	cssSources: function (assets) {
		return _.pluck(_.filter(assets.css, function (asset) {
			return asset.ownerpartial === 'index'
				|| asset.ownerpartial === 'all'
		}), 'path');
	}
};