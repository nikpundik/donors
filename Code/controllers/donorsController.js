var donorsController = {

	io: null,
	model: null,

	get: function (req, res) {
		var donorId = req.params.id;
	 
		donorsController.model.findOne({_id: donorId}, function(err, doc) {
			if (err) res.json(false);
			else {
				res.json(doc);
			}
		});
	},

	add: function (req, res) {
		req.body.ipAddress = req.ip;

		delete req.body._id;
		var data = new donorsController.model(req.body);
		 
		data.save(function (err, result) {
			if (err) res.json(err);
			else {
				donorsController.io.sockets.emit('updatedDonor', result.coords);
				res.json(result._id);
			}	
		});
	},

	update: function (req, res) {
		var donorId = req.body._id;
		delete req.body._id;

		donorsController.model.update({_id: donorId}, req.body, { multi: false, runValidators: true}, function (err, data) {
			if (err) res.json(err);
			else {
				donorsController.io.sockets.emit('updatedDonor', req.body.coords);
				res.json(true);
			}	
		});
	},

	remove: function (req, res) {
		var donorId = req.body.donorId;

		donorsController.model.remove({_id: donorId}, function (err, data) {
			if (err) res.json(false);
			else {
				donorsController.io.sockets.emit('updatedDonor', req.body.coords);
				res.json(true);
			}	
		});
	}

};

module.exports = donorsController;