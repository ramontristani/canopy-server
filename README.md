Canopy Server
=============
Canopy server is a NodeJS/Express boilerplate application implementation. It is work in progress. It provides a 
basic implementation of server side components, as well as an AngularJS based client implementation 
with HTML5 Mode enabled. It is intended as a starting point for building NodeJS web applications.

## Features at a Glance
 * All server HTML is rendered minified. Additional steps will need to be taken to minimize AngularJS templates
 * Connection to databases occurs on startup
 * AngularJS HTML5 Mode is enabled and supported on the server. Refreshing routes preserves the current route
	
## Planned features
 * Socket.io implementation
 * More to come...

## Getting Started
In order to get started, fork the repository or download a zip archive of the repository. Once downloaded, 
open the command line and execute the following commands:

```
$ npm install
```

Then,

```
$ bower install
```

This will install all the necessary dependencies for the application server. Because the server uses 
MongoDB and DiskDB, it is necessary to have MongoDB installed in your system, or have access to a cloud 
hosted MongoDB database. In order to configure the database, open the "**/startup/config.js**" file and 
modify the following section as follows:

## Configuration For DiskDB
```
...

database: {
	mongodb: {
		// Set this flag to false
		setdefault: false,
		connection: ''
	},
	
	diskdb: {
		// Set this flag to true
		setdefault: true,
		
		// Set the data path to the desired directory where 
		// JSON data files will be saved
		path: 'data',
		
		// Add all of the target collection names in the collections array
		collections: [
			'users',
			'logs'
		]
	}
}
```

## Configuration For MongoDB
```
...

database: {
	mongodb: {
		// Set this flag to true
		setdefault: true,
		
		// Provide the URL where the MongoDB database is
		connection: 'mongodb://localhost/database-name'
	},
	
	diskdb: {
		// Set this flag to false
		setdefault: false,
		path: '',
		collections: [
			'users',
			'logs'
		]
	}
}
```


You are all set.
Build something great!