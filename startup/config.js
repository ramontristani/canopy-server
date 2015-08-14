'use strict';

console.log('\n- Initializing server configuration');

module.exports = {
	general: {
		title: 'Canopy Server',
		description: ''
	},
	
	server: {
		port: process.env.PORT || 1337,
		deploymenttype: 'dev',
		minification: {
			minifyrenders: true,
			options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: false,
					removeEmptyAttributes: true
				}
		}
	},
	
	keys: {
		sessions: '0c67f367-cc77-45fd-a2ec-2ea3a6f51ba8',
		cookies: '8df275b7-f35f-4ea1-bcc8-052817d780ad'
	},
	
	database: {
		mongodb: {
			setdefault: true,
			connection: 'mongodb://localhost/canopy-server'
		},
		
		diskdb: {
			setdefault: false,
			path: 'data',
			collections: [
				'users',
				'logs'
			]
		}
	},
	
	mail: {
		service: '',
		auth: {
			user: '',
			pwd: ''
		}
	}
};