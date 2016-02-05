"use strict";

var donorsController = require('../Code/controllers/donorsController');

describe("Donors controller", function() {

	var controller;
	var model;
	var io;

	beforeEach(function() {
		controller = donorsController;
		model = {};
		io = {};
		controller.model = model;
		controller.io = io;
	});

	it("should get the controller", function() {
		expect(controller).toBeDefined();
	});

	it("should responde with json for get", function(done) {

		var req = {params: {id: ''}};
		var res = {json: function() {}};

		spyOn(res, 'json');

		model.findOne = function(condition, complete) {
			setTimeout(function() {
		    	complete(null, [1,2,3]);
		    	expect(res.json).toHaveBeenCalled();
		    	done();
			}, 2);
		};

		controller.get(req, res);

	});

	it("should emit socket message after success of add", function(done) {

		var req = {body: {}, ip: ''};
		var res = {json: function() {}};

		io.sockets = {
			emit: function(msg, data) {}
		};
		controller.model = function(data) {
			return {
				save: function(complete) {
					complete(false, {});
		    		expect(io.sockets.emit).toHaveBeenCalledWith('updatedDonor', undefined);  
		    		done();
				}
			};
		};

		spyOn(io.sockets, 'emit');

		controller.add(req, res);

	});

	it("should emit socket message after success of update", function(done) {

		var req = {body: {_id: ''}};
		var res = {json: function() {}};

		io.sockets = {
			emit: function(msg, data) {}
		};
		controller.model = {
			update: function(conditions, updates, options, complete) {
				complete(false, {});
    			expect(io.sockets.emit).toHaveBeenCalledWith('updatedDonor', undefined);  
    			done();
			}
		}

		spyOn(io.sockets, 'emit');

		controller.update(req, res);

	});

	it("should emit socket message after success of remove", function(done) {

		var req = {body: {}};
		var res = {json: function() {}};

		io.sockets = {
			emit: function(msg, data) {}
		};
		controller.model = {
			remove: function(conditions, complete) {
				complete(false, {});
    			expect(io.sockets.emit).toHaveBeenCalledWith('updatedDonor', undefined);  
    			done();
			}
		}

		spyOn(io.sockets, 'emit');

		controller.remove(req, res);

	});

});