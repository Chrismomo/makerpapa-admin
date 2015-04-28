// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'MakerPapa_admin',
	'brand': 'MakerPapa_admin',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'Ts{nm4,s_oO?@sp~".*b:gGADsLgynbbuHd|4SzvEQ2$2,1iNt]z=*7WBgC^=BZt'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'课程': '1.papaclass',
	'社区': '2.community',
	'活动': '3.activity',
	'用户': 'users'
});


var mongoose = keystone.mongoose;


    console.log('-------------------------' + keystone.get('mongo'));

mongoose.connection.on('connecting', function() {
    console.log('--------->>>>>>>>>>>>connecting...');
});
mongoose.connection.once('open', function() {
    console.log('--------->>>>>>>>>>>> opened!' + keystone.get('mongo'));
});
mongoose.connection.on('reconnected', function () {
    console.log('--------->>>>>>>>>>>> reconnected!');
});

mongoose.connection.on('connected', function () {
  console.log('------->>>>>connected ');
});
 
// If the connection throws an error
mongoose.connection.on('error',function (err) {

  console.log('------->>>>> error: ' + err);

  console.log('------->>>>==============> err.name: before  ' + err.name);
	err.name = 'ValidationError';
	 console.log('------->>>>==============> err.name: after ' + err.name);

  // mongoose.connection.close();
  // mongoose.connect(keystone.get('mongo'));
  console.log(",,,,,,,,,,,,,.,.......................... EventEmitter.listenerCount(emitter, event)   before == " + require('events').EventEmitter.listenerCount(mongoose.connection, 'error'));

	mongoose.connection.removeAllListeners('error');

	mongoose.connection.on('error',function (err) {

  console.log('------->>>>> error: ' + err);

  console.log('------->>>>==============> err.name: before  ' + err.name);
	err.name = 'ValidationError';
	 console.log('------->>>>==============> err.name: after ' + err.name);
	});
console.log(",,,,,,,,,,,,,.,.......................... EventEmitter.listenerCount(emitter, event) after remove all == " + require('events').EventEmitter.listenerCount(mongoose.connection, 'error'));

});

// console.log("xxxx" + mongoose.connection.setMaxListeners)
console.log(",,,,,,,,,,,,,.,.......................... EventEmitter.listenerCount(emitter, event)" + require('events').EventEmitter.listenerCount(mongoose.connection, 'error'));
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('------->>>>> disconnected');
  //mongoose.connect(config.mongo.uri, config.mongo.options);
  // mongoose.connect(keystone.get('mongo'));
});

mongoose.connection.on('close', function () {
  console.log('------->>>>> close!!!!!!!!');
  //mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connect(keystone.get('mongo'));

});


process.on('uncaughtException', function(err) {
  console.log('Caught exception:============================= ...');
});


var domain = require('domain'),
d = domain.create();

d.on('error', function(err) {
  console.log('-----===================================stop explose ......................................');
  // console.error(err);
});

d.add(keystone);

// Start Keystone to connect to your database and initialise the web server

keystone.start();
