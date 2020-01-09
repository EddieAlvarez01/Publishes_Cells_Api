'use strict'

var db = require("../dao");

var controller = {

	GetHelpDeskYear: function(req, res){
		var year = req.params.year;
		db.open(`SELECT usr.name, usr.lastname, usr.email, usr.gender, TO_CHAR(usr.birthDay, 'DD/MM/YYYY') fechaNac, r.name rol
				FROM User1 usr
				INNER JOIN Role r ON r.id = usr.idRole
				WHERE EXTRACT(year FROM birthDay) > :year AND usr.gender = 'M' AND r.id = 2`, [year], false, res);
	},

	GetAdminYear: function(req, res){
		var year = req.params.year;
		db.open(`SELECT usr.name, usr.lastname, usr.email, usr.gender, TO_CHAR(usr.birthDay, 'DD/MM/YYYY') fechaNac, r.name rol
				FROM User1 usr
				INNER JOIN Role r ON r.id = usr.idRole
				WHERE EXTRACT(year FROM birthDay) < :year AND usr.gender = 'F' AND r.id = 1`, [year], false, res);
	},

	GetHigherProfit: function(req, res){
		db.open(`SELECT usr.name, usr.lastname, usr.email, usr.profitEarned, usr.gender, TO_CHAR(usr.birthDay, 'DD/MM/YYYY') fechaNac, r.name rol
				FROM User1 usr
				INNER JOIN Role r ON r.id = usr.idRole
				WHERE r.id = 3
				ORDER BY usr.profitEarned DESC`, [], false, res);
	},

	GetProductsByWeighing: function(req, res){
		var score = req.params.score;
		db.open(`SELECT MAX(p.description) description, MAX(p.code)code, MAX(p.price) price, MAX(usr.name)name, MAX(usr.lastname)lastname, MAX(ROUND((SELECT AVG(w2.quantity) 
                                        												FROM Weighing w2
                                        												WHERE w2.idProduct = w.idProduct))) average, MAX(cl.nombre)color 
				FROM Weighing w
				INNER JOIN Product p ON p.id = w.idProduct
				INNER JOIN ProductUser pu ON pu.idProduct = w.idProduct
				INNER JOIN User1 usr ON usr.id = pu.idUser
				INNER JOIN Product_Color pc ON pc.idProduct = p.id
				INNER JOIN Color cl ON cl.id = pc.idColor
				GROUP BY w.idProduct
				HAVING ROUND((SELECT AVG(w2.quantity) average  
				FROM Weighing w2
				WHERE w2.idProduct = w.idProduct)) = :score`, [score], false, res);
	},

	GetTop3BestProducts: function(req, res){
		db.open(`SELECT description, quantity, name, lastName, code, color
				FROM (
    					SELECT MAX(p.code) code, MAX(usr.name)name, MAX(usr.lastName) lastName, MAX(p.description) description, (SELECT SUM(quantity) 
                    															FROM BillDetail
                    															WHERE bd.idProduct = idProduct) quantity, MAX(c.nombre)color
						FROM BillDetail bd
						INNER JOIN Product p ON p.id = bd.idProduct
						INNER JOIN ProductUser pu ON pu.idProduct = bd.idProduct
						INNER JOIN User1 usr ON usr.id = pu.idUser
						INNER JOIN Product_Color pc ON pc.idProduct = bd.idProduct
						INNER JOIN color c ON c.id = pc.idColor
						GROUP BY bd.idProduct
						ORDER BY SUM(bd.quantity) DESC
					)
				WHERE ROWNUM <= 3`, [], false, res);
	},

	GetTop3Customers: function(req, res){
		db.open(`SELECT name, lastName, productos, email, fechaNac
				FROM(
				    SELECT MAX(usr.name)name, MAX(usr.lastName)lastName, MAX(usr.email)email, MAX(TO_CHAR(usr.birthDay, 'DD/MM/YYYY')) fechaNac, COUNT(pu.idProduct) productos
				    FROM ProductUser pu
				    INNER JOIN User1 usr ON usr.id = pu.idUser 
				    GROUP BY pu.idUser
				    ORDER BY COUNT(pu.idProduct) DESC   
				)
				WHERE ROWNUM <= 3`, [], false, res);
	},

	GetProductsComments: function(req, res){
		var date = req.params.date;
		db.open(`SELECT MAX(description) description, COUNT(*) comments, MAX(dateMsg)dateMsg, MAX(code) code, MAX(name)name, MAX(lastName) lastname, MAX(color)color
				FROM (
				    SELECT c.idProduct, p.code, p.description, TO_CHAR(c.creationDate, 'DD/MM/YYYY') dateMsg, usr.name, usr.lastname, cl.nombre color
				    FROM Commentary c
				    INNER JOIN Product p ON p.id = c.idProduct
				    INNER JOIN ProductUser pu ON pu.idProduct = c.idProduct
				    INNER JOIN User1 usr ON usr.id = pu.idUser
				    INNER JOIN Product_Color pc ON pc.idProduct = c.idProduct
				    INNER JOIN Color cl ON cl.id = pc.idColor
				    WHERE TRUNC(c.creationDate) = TO_DATE(:dateE, 'DD-MM-YYYY')
				) c
				GROUP BY idProduct`, [date], false, res);
	},

	GetProductsStock: function(req, res){
		var quantity = req.params.quantity;
		db.open(`SELECT p.code, p.description, p.price, p.stock, usr.name, usr.lastName, c.nombre color
				FROM Product p
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 usr ON usr.id = pu.idUser
				INNER JOIN Product_Color pc ON pc.idProduct = p.id
				INNER JOIN Color c ON c.id = pc.idColor
				WHERE p.stock = :quantity`, [quantity], false, res);
	},

	GetProductsRatingTop3: function(req, res){
		db.open(`SELECT description, code, price, average, name, lastName
				FROM (
    				SELECT MAX(p.description) description, MAX(p.code)code, MAX(usr.name)name, MAX(usr.lastName)lastName, MAX(p.price) price, MAX(ROUND((SELECT AVG(w2.quantity) 
                                                                                            FROM Weighing w2
                                                                                            WHERE w2.idProduct = w.idProduct))) average  
    				FROM Weighing w
    				INNER JOIN Product p ON p.id = w.idProduct
    				INNER JOIN ProductUser pu ON pu.idProduct = w.idProduct
    				INNER JOIN User1 usr ON usr.id = pu.idUser
    				GROUP BY w.idProduct
    				ORDER BY ROUND((SELECT AVG(w2.quantity) 
                    				FROM Weighing w2
                    				WHERE w2.idProduct = w.idProduct)) ASC   
				)
				WHERE ROWNUM <= 3`, [], false, res);
	},

	GetAllProducts: function(req, res){
		db.open(`SELECT p.id, p.code, p.description, p.price, p.idCategory, usr.name, usr.lastName, c.name namCategory, cl.nombre
			 	FROM Product p
			 	INNER JOIN ProductUser pu ON pu.idProduct = p.id
			 	INNER JOIN Category c ON c.id = p.idCategory
			 	INNER JOIN User1 usr ON usr.id = pu.idUser
			 	INNER JOIN Product_Color pc ON pc.idProduct = p.id
			 	INNER JOIN Color cl ON cl.id = pc.idColor`, [], false, res);
	},

	GetFatherCategory: function(req, res){
		var idCategory = req.params.idCategory;
		db.open(`SELECT name
				FROM Category
				WHERE id = (
					SELECT fatherCategory
					FROM Category
					WHERE id = :idCategory
				)`, [idCategory], false, res);
	},

	GetAverageHelpDesk: function(req, res){
		db.open(`SELECT MAX(usr.name) name, MAX(usr.lastname) lastname, MAX((SELECT AVG(ur2.quantity) 
																FROM UserRating ur2
																WHERE ur2.idHelpDesk = ur.idHelpDesk)) average
				FROM UserRating ur
				INNER JOIN User1 usr ON usr.id = ur.idHelpDesk
				GROUP BY ur.idHelpDesk
				ORDER BY (SELECT AVG(ur2.quantity)
							FROM UserRating ur2
							WHERE ur2.idHelpDesk = ur.idHelpDesk) DESC`, [], false, res);
	}

}

module.exports = controller;