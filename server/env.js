var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://fwrkchd1:fwrkchd123@ds149433.mlab.com:49433/fwrkchd1',
		
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://fwrkchd1:fwrkchd123@ds149433.mlab.com:49433/fwrkchd1' || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
		port: process.env.PORT || 80
	}
};