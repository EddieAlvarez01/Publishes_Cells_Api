'use strict'

var db = require("../dao");

var controller = {

	GetAllCategories: function(req, res){
		db.open(`SELECT id, name, fatherCategory FROM Category`, [], false, res);
	}

}

module.exports = controller;