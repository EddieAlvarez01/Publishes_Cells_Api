'use strict'

var db = require("../dao");

var controller = {

	GetAllCategories: function(req, res){
		db.open(`SELECT id, name, fatherCategory FROM Category`, [], false, res);
	},

	GetAllProducts: function(req, res){
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor`, [], false, res);
	}

}

module.exports = controller;