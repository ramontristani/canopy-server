/**
* DISCLAIMER: 
* Passwords must be changed and stored securely. All accounts,  acount as defined
* in this file should be modified to suit your needs. Sufice to say, this file
* contains sensitive information and should not be added to publically viewable
* source control services such as Bitbucket or GitHub. Please store in a private
* repository.
*/
'use strict';

console.log('\n- Initializing server configuration');

module.exports = {
	general: {
		title: 'Canopy Server',
		description: 'Basic web application server for sites or RESTful API\'s'
	},
	
	server: {
		port: process.env.PORT || 1337,
		deploymenttype: 'dev',
		enablecors: true,
		logroutes: true,
		socketsenabled: true,
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
	
	/**
	 * During development, this enables the browser to launch the provided
	 * location after "npm start" is issued at the command line.
	 * 
	 * Options:
	 * openbrowser: set to false if you do not want the browser to open
	 * location: the URL to load when the browser opens
	 * browser: Leave empty for default browser, or include the name of the
	 * 			browser to open, i.e. "Firefox", "Safari", etc.
	 */
	development: {
		openbrowser: true,
		location: 'http://localhost:1337',
		browser: ''
	},
	
	keys: {
		sessions: '0c67f367-cc77-45fd-a2ec-2ea3a6f51ba8',
		cookies: '8df275b7-f35f-4ea1-bcc8-052817d780ad'
	},
	
	tokens: {
		issuer: 'localhost@canopyserver.com',
		subject: 'API Access',
		secret: '62da65af-b5eb-4151-9ad2-abf3c96524d3',
		daysexpires: 5,
		jwtencoding: 'HS512'
	},
	
	crypto: {
		swf: 10
	},
	
	accounts: {
		maxloginattempts: 5,
		client: {
			firstname: 'Public',
			lastname: 'User',
			email: 'publicuser@canopyserver.com',
			secret: 'canopy',
			avatar: '/media/default-avatar.png',
			active: true,
			created: Date.now(),
			updated: Date.now()
		}
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