var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://donor:sevendrunkenpirates@ds059185.mongolab.com:59185/node-donors');
var DonorModel = require('./models/donor');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// middleware

app.use(express.static(__dirname + '/public/react'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// api routes

var donorsController = require('./controllers/donorsController');
donorsController.io = io;
donorsController.model = DonorModel;

app.get('/api/donor/:id', donorsController.get);
app.post('/api/add', donorsController.add);
app.post('/api/update', donorsController.update);
app.post('/api/remove', donorsController.remove);

// sockets

io.on('connection', function(socket) {

	socket.on('getDonors', function(coords) {
		DonorModel.find({ 
			'coords.y': {$gt: coords.west, $lt: coords.east},
			'coords.x': {$gt: coords.south, $lt: coords.north}
		}, function(err, doc) {
			if (err) doc = [];
			socket.emit('gotDonors', doc);
		});
	});

});

// server start

var port = process.env.PORT || 8080;

http.listen(port, function () {
	console.log('Donors server started..');
});