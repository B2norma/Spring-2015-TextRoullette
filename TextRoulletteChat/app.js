// This is the main file of our chat app. It initializes a new 
// express.js instance, requires the config and routes files
// and listens on a port. Start the application by running
// 'node app.js' in your terminal


var express = require('express'),
	app = express();

// This is needed if the app is run on heroku:

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

mongoose.connect('mongodb://root:Indiana1@localhost:27017/admin', function(err) {
    if(err) {
		console.log(err);
        console.log('First attempt failed connecting to database...Trying again!.');
		mongoose.connect('mongodb://root:Brittany1@localhost:27017/admin', function(err) {
			
			
			logTheConsole(err);
			if(err) {
				mongoose.connect('mongodb://localhost:27017/chatApp', function(err) {
					logTheConsole(err);
				});
			}
		});
    } else {
        console.log('connection successful');
    }
});

//	if err, log error to the console
function logTheConsole(err) {
	if(err) {
		console.log('FATAL ERROR!!', err);
	} else {
		console.log('connection successful');
	}
}

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./routes')(app, io);


console.log('Your application is running on http://localhost:' + port);