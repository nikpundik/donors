"use strict";

var validator = require('../Code/helpers/validator');

describe("Validator", function() {

	it("should validate an email", function() {
		expect(validator.validateEmail('sevendrunken@pirates.fm')).toBe(true);
		expect(validator.validateEmail('@pr.hn')).toBe(false);
		expect(validator.validateEmail('sevendrunkenpirates')).toBe(false);
		expect(validator.validateEmail('sevendrunkenpirates@')).toBe(false);
		expect(validator.validateEmail('sevendrunken@pirates')).toBe(false);
		expect(validator.validateEmail('')).toBe(false);
		expect(validator.validateEmail(null)).toBe(false);
		expect(validator.validateEmail(undefined)).toBe(false);

	});

	it("should validate a phone number", function() {
		expect(validator.validateNumber('00 3333 333 333')).toBe(true);
		expect(validator.validateNumber('+39 3333 333 333')).toBe(true);
		expect(validator.validateNumber('003333 333 333')).toBe(true);
		expect(validator.validateNumber('+393333 333 333')).toBe(true);
		expect(validator.validateNumber('3432432')).toBe(false);
		expect(validator.validateNumber('sevendrunkenpirates')).toBe(false);
		expect(validator.validateNumber(' +39 00 00 00 00')).toBe(false);
		expect(validator.validateNumber(' 00 0 00 0 0 000')).toBe(false);
		expect(validator.validateNumber('+aa 00 00 0 0 0')).toBe(false);
		expect(validator.validateNumber('0O 3333 333 333')).toBe(false);
		expect(validator.validateNumber('')).toBe(false);
		expect(validator.validateNumber(null)).toBe(false);
		expect(validator.validateNumber(undefined)).toBe(false);
	});

});