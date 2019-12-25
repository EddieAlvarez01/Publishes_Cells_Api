'use strict'

var db = require("../dao");

var controller = {

	GetDataHome: function(req, res){
		
		db.open(`SELECT * FROM HomePage
				WHERE id = 1`, [], false, res);
	}

}

module.exports = controller;