'use strict'

var db = require("../dao");

var controller = {

	GetAllCategories: function(req, res){
		db.open(`SELECT id, name, fatherCategory FROM Category`, [], false, res);
	},

	GetAllProducts: function(req, res){
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser`, [], false, res);
	},

	GetProductNoLogedByCategory: function(req, res){
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE p.idCategory = :idCategory OR ca.fatherCategory = :idCategory`, [idCategory, idCategory], false, res);
	},

	GetProductsNoLoggedByMatch: function(req, res){
		var match = '%' + req.params.match + '%';
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE LOWER(p.description) LIKE :match`, [match], false, res);
	},

	GetProductsNoLoggedByMatchByCategory: function(req, res){
		var match = '%' + req.params.match + '%';
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE (p.idCategory = :idCategory OR ca.fatherCategory = :idCategory) AND LOWER(p.description) LIKE :match`, [idCategory, idCategory, match], false, res);
	}	

}

module.exports = controller;