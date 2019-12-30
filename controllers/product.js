'use strict'

var db = require("../dao");

var controller = {

	GetAllCategories: function(req, res){
		db.open(`SELECT id, name, fatherCategory FROM Category`, [], false, res);
	},

	GetAllProducts: function(req, res){
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser`, [], false, res);
	},

	GetProductNoLogedByCategory: function(req, res){
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
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
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
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
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE (p.idCategory = :idCategory OR ca.fatherCategory = :idCategory) AND LOWER(p.description) LIKE :match`, [idCategory, idCategory, match], false, res);
	},

	GetProductById: function(req, res){
		var idProduct = req.params.id;
		db.open(`SELECT p.image, p.description, p.price, TO_CHAR(p.publicationDate, 'DD/MM/YYYY') publicationDate, p.stock, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE p.id = :idProduct`, [idProduct], false, res);
	},

	GetAllProductsForUser: function(req, res){
		var idUser = req.params.idUser;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE pu.idUser <> :idUser`, [idUser], false, res);
	},

	GetAllProductsForUserByCategory: function(req, res){
		var idUser = req.params.idUser;
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE (p.idCategory = :idCategory OR ca.fatherCategory = :idCategory) AND pu.idUser <> :idUser`, [idCategory, idCategory, idUser], false, res);
	},

	GetAllProductsForUserMatch: function(req, res){
		var idUser = req.params.idUser;
		var match = '%' + req.params.match + '%';
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE LOWER(p.description) LIKE :match AND pu.idUser <> :idUser`, [match, idUser], false, res);
	},

	GetAllProductsForUserMatchByCategory: function(req, res){
		var idUser = req.params.idUser;
		var match = '%' + req.params.match + '%';
		var idCategory = req.params.idCategory;
		db.open(`SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName, p.stock
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN Category ca ON ca.id = p.idCategory
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE (p.idCategory = :idCategory OR ca.fatherCategory = :idCategory) AND LOWER(p.description) LIKE :match AND pu.idUser <> :idUser`, [idCategory, idCategory, match, idUser], false, res);
	},

	AddProductCart: function(req, res){
		var idShoppingCart = req.body.idShoppingCart;
		var idProduct = req.body.idProduct;
		var quantity = req.body.quantity;
		db.open(`INSERT INTO ProductCart(idShoppingCart, idProduct, quantity)
				VALUES(:idShoppingCart, :idProduct, :quantity)`, [idShoppingCart, idProduct, quantity], true, res);
	},

	VerifyCart: function(req, res){
		var idShoppingCart = req.params.idShoppingCart;
		var idProduct = req.params.idProduct;
		db.open(`SELECT idShoppingCart FROM ProductCart WHERE idShoppingCart = :idShoppingCart AND idProduct = :idProduct`, [idShoppingCart, idProduct], false, res);
	},

	GetProductShoppingCart: function(req, res){
		var idShoppingCart = req.params.idShoppingCart;
		db.open(`SELECT ca.idProduct, ca.quantity, p.description, p.price, p.stock
				FROM ProductCart ca
				INNER JOIN Product p ON p.id = ca.idProduct
				WHERE ca.idShoppingCart = :idShoppingCart`, [idShoppingCart], false, res);
	}	

}

module.exports = controller;