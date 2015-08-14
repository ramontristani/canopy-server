'use strict';

var defaultPageRoutes = require('./default');

module.exports = {
	register: function(server) {
		defaultPageRoutes.register(server);
	}
};