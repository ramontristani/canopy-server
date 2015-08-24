'use strict';

var _ = require('lodash')
	, assetUtil = require('../common/assets-util');

module.exports = {
	register: function (server) {
		server.app.route('/').get(function (request, response) {
			var options = {
				title: server.config.general.title,
				description: server.config.general.description,
				year: new Date().getFullYear(),
				css: assetUtil.cssSources(server.assets),
				js: assetUtil.aggregateScripts(assetUtil.vendorScripts(server.config), 
					assetUtil.customScripts(server.assets))
			};

			response.render('index', options);
		});
	}
};