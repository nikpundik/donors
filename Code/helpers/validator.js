var validator = {
	validateEmail: function(email) {
		var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    	return re.test(email);
	},
	validateNumber: function(number) {
		var re = /(^\+|^00)[0-9 ]{2,}/;
	    return re.test(number);
	}
};

module.exports = validator;
