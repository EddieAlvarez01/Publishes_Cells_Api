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
	},

	GetProductNoLogedByCategory: function(req, res){
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				WHERE p.idCategory = :idCategory OR ca.fatherCategory = :idCategory`, [idCategory, idCategory], false, res);
	}	

}

module.exports = controller;