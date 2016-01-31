if(process.env.NODE_ENV !== "production"){
	require("dotenv").load();
}
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var mongoose = require('mongoose');
require("./models/User");
require("./models/Draft");
require("./config/passport");

// DATABASE CONNECTION
mongoose.connect("mongodb://localhost/NFLDraft");
// var database = process.env.MONGOLAB || "mongodb://localhost/FailedMongoLab";
// console.log(database);
// mongoose.connect(database, function(err){
// 	console.log("Connect");
// 	if(err) return console.log('error connecting to %s', database);
// 	console.log('connected to %s', database);
// });



app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

// MIDDLEWARE
// app.use(session({ secret: 'session secret key', cookie: {secure: false} })); // if using http on routes, true is fine. making sure links match on callback url.
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

// ROUTE LINKS
var userRoutes = require('./routes/userRoutes');
var drafts = require('./routes/draftRoutes');

// Use Routes
app.use("/user", userRoutes);
app.use("/draft", drafts);

// Handle Errors
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(400).send(err);
});


var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('App listening at http://localhost:' + port);
});
