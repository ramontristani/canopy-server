/**
* #DISCLAIMER
* Passwords must be changed and stored securely. All accounts,  acount as defined
* in this file should be modified to suit your needs. Sufice to say, this file
* contains sensitive information and should not be added to publically viewable
* source control services such as Bitbucket or GitHub. Please store in a private
* repository.
*/
'use strict';

console.log('\n- Initializing server configuration');

/**
 * ##Main Configuration Module
 * The main configuration module defines all of the operational settings and characteristics of the application server. <strong>NOTE: </strong>This file should be kept secure
 * @general Singleton container of application descriptive attributes
 * @server Singleton container of server specific options resolved at runtime
 * @development Singleton container of environmental options specific for development
 * @keys Singleton container used for holding string keys
 * @tokens Singleton container used JSON web token configuration options
 * @crypto Singleton container used for cryptography options
 * @accounts Singleton container used for storing default accounts that should be created on first run
 * @database Singleton container used for defining database server options
 * @mail Singleton container used for storing mail configuration options
 * @exports Configuration singleton object
 */
module.exports = {
	/**
	 * ##General Configuration Options
	 * The general configuration options provide a container of non operational descriptive attributes used by the application server
	 * @title String property representing the title of the application
	 * @description String property representing the application description
	 */
	general: {
		title: 'Canopy Server',
		description: 'Basic web application server for sites or RESTful API\'s'
	},
	
	/**
	 * ##Server Configuration Options
	 * The server configuration options define a container of settings used for defining how the server behaves ar runtime
	 * @port Port assigned to the server
	 * @deploymenttype Defines whether the server is deployd in "dev" or "prod" mode
	 * @enablecors Enables/Disables cross-domain service enpoint requests
	 * @logroutes Enables/Disables logging of route requests to the database
	 * @socketsenabled Enables/Disables web sockets with socket.io
	 * @minification Enables/Disables minified HTML rendered output from server views
	 * @see https://www.npmjs.com/package/socket.io
	 */
	server: {
		port: process.env.PORT || 1337,
		deploymenttype: 'dev',
		enablecors: true,
		logroutes: true,
		socketsenabled: true,
		/**
		 * ###Minification options
		 * @minifyrenders Enables/Disables minified rendered HTML from the server
		 * @options Minification options as required by the "html-minifier" NPM package
		 * @see https://www.npmjs.com/package/html-minifier
		 */
		minification: {
			minifyrenders: true,
			/**
			 * ###HTML ninifier parameters
			 * @removeComments
			 * @removeCommentsFromCDATA
			 * @collapseWhitespace
			 * @collapseBooleanAttributes
			 * @removeAttributeQuotes
			 * @removeEmptyAttributes
			 * @see https://www.npmjs.com/package/html-minifier
			 */
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
	 * ##Development Options
	 * The development oftions section provides a container that facilitates the definition of operational characteristics during development
	 * @openbrowser Enables/Disables automatic loading of the root route on the web browser on launch
	 * @location Default URL to be opened by the browser on launch
	 * @browser When left empty, the default browser is used. Specify other browsers for other options, i.e. "Safari" or "Firefox"
	 * @see https://www.npmjs.com/package/open
	 */
	development: {
		openbrowser: false,
		location: 'http://localhost:1337',
		browser: ''
	},
	
	/**
	 * ##Encoding Keys
	 * The encoding keys options provides a container that stores special keys for general encoding/decoding operations
	 * @sessions Key used for encoding session data
	 * @cookies Key used for encoding cookie data
	 */
	keys: {
		sessions: '0c67f367-cc77-45fd-a2ec-2ea3a6f51ba8',
		cookies: '8df275b7-f35f-4ea1-bcc8-052817d780ad'
	},
	
	/**
	 * ##JSON Web Token Options
	 * The JSON web token options provide a boilerplate definition of data that will be used for encoding JSON web tokens
	 * @issuer Name of the entity issuing the JSON web token
	 * @subject A description of the reason for issuing the web token
	 * @secret A string key used for encoding the JSON web token
	 * @daysexpires A date value used for setting an expiration limit on the JSON web token
	 * @jwtencoding Encoding algorithm used for encoding the JSON web token
	 * @see https://www.npmjs.com/package/jwt-simple
	 */
	tokens: {
		issuer: 'localhost@canopyserver.com',
		subject: 'API Access',
		secret: '62da65af-b5eb-4151-9ad2-abf3c96524d3',
		daysexpires: 5,
		jwtencoding: 'HS512'
	},
	
	/**
	 * ##Encryption options
	 * The encryption options allows for the definition of cryptography operation options such as those used for hashing account passwords
	 * @swf Salt work factor value
	 * @see https://www.npmjs.com/package/bcrypt
	 */
	crypto: {
		swf: 10
	},
	
	/**
	 * ##Default System Accounts
	 * The default system accounts configuration allows the application to create default accounts for services, or administration purposes.
	 * @maxloginattempts Maximum number of failed login attempts prior to accout locking. This helps prevent brute force attacks
	 * @objects Account object array containing default account definitions
	 */
	accounts: {
		maxloginattempts: 5,
		objects: [
			{
				firstname: 'Public',
				lastname: 'User',
				email: 'publicuser@canopyserver.com',
				secret: 'canopy',
				avatar: '/media/default-avatar.png',
				active: true,
				created: Date.now(),
				updated: Date.now()
			}
		]
	},
	
	/**
	 * ## Database Options
	 * The database configuration options are used for defining the database engine to be used by the
	 * application server. Database providers are mutually exclusive. Pick one or the other!
	 * @mongodb MongoDB connection options
	 * @diskdb DiskDB connection options
	 */
	database: {
		/**
		 * ###Mongoose options
		 * @setdefault Sets MongoDB as the default database. Set "diskdb.setdefault" to false when using MongoDB
		 * @connection The connection string to the server/database
		 * @see https://www.npmjs.com/package/mongoose
		 */
		mongodb: {
			setdefault: true,
			connection: 'mongodb://localhost/canopy-server'
		},
		
		/**
		 * ###DiskDB Options
		 * @setdefault Sets DiskDB as the default database. Set "mongodb.setdefault" to false when using DiskDB
		 * @path The physical folder path where DiskDB will store its data files. Default is "./data"
		 * @collections The default collections that should be created in the file system on first run
		 * @see https://www.npmjs.com/package/diskdb
		 */
		diskdb: {
			setdefault: false,
			path: 'data',
			collections: [
				'users',
				'logs'
			]
		}
	},
	
	/**
	 * ##Mail Configuration Options
	 * The mail configuration options are used for specifying the default service and account used for mail 
	 * sending operations by the application server
	 * @service Name of the mail service used for SMTP operations
	 * @auth Mail service credentials object
	 * @see https://www.npmjs.com/package/nodemailer
	 */
	mail: {
		service: '',
		
		/**
		 * ###Mail Authentication Options
		 * @user User name used for logging in to the mail service (usually and email address)
		 * @pwd Password used in combilation with a user name to log in to the mail service
		 */
		auth: {
			user: '',
			pwd: ''
		}
	}
};