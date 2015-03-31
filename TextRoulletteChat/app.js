// This is the main file of our chat app. It initializes a new 
// express.js instance, requires the config and routes files
// and listens on a port. Start the application by running
// 'node app.js' in your terminal


var express = require('express'),
	app = express();

// This is needed if the app is run on heroku:

var port = process.env.PORT || 8080;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/WaitingUser", function(err, db) {
  if(!err) {
    console.log("We are connected to the database.");
  }
});

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./routes')(app, io);

app.use(function(req,res,next){
    req.db = db;
    next();
});

console.log('Your application is running on http://localhost:' + port);