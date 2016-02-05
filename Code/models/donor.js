var mongoose = require('mongoose');
var validator = require('../helpers/validator');

var donorSchema = {
	firstName: String,
	lastName: String,
	emailAddress: {
		type: String,
		validate: {
			validator: validator.validateEmail,
			message: '"{VALUE}" is not a valid email address.'
		}
	},
	contactNumber: {
		type: String,
		validate: {
			validator: validator.validateNumber,
			message: '"{VALUE}" is not a valid phone number.'
		}
	},
	bloodGroup: String,
	ipAddress: String,
	address: String,
	coords: {x: Number, y: Number}
};

var model = mongoose.model('Donor', donorSchema, 'node-donors');

module.exports = model;