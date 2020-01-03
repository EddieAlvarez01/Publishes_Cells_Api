'use strict'

var db = require("../dao");
var mailjet = require('node-mailjet').connect(
	process.env.MJ_APIKEY_PUBLIC,
	process.env.MJ_APIKEY_PRIVATE
);

var objOracle = require('oracledb');
objOracle.outFormat = objOracle.OBJECT;

var connection =  {
	user: "db_Publishes_Sells",
	password: "SDnlbI",
	connectString: "localhost:1521/xe"
}

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
		db.open(`SELECT ca.idProduct, ca.quantity, p.description, p.price, p.stock, p.code
				FROM ProductCart ca
				INNER JOIN Product p ON p.id = ca.idProduct
				WHERE ca.idShoppingCart = :idShoppingCart`, [idShoppingCart], false, res);
	},

	DeleteProductCart: function(req, res){
		var idShoppingCart = req.params.idShoppingCart;
		var idProduct = req.params.idProduct;
		db.open('DELETE FROM ProductCart WHERE idShoppingCart = :idShoppingCart AND idProduct = :idProduct', [idShoppingCart, idProduct], true, res);
	},

	//No use el metodo de dao porque necesito que el procedure me devuelva el id de la factura.
	BuyProducts: function(req, res){
		var idUser = req.body.idUser;
		var nameClient = req.body.nameClient;
		var idShoppingCart = req.body.idShoppingCart;
		var dateBill = req.body.dateBill;
		var total = req.body.total;
		objOracle.getConnection(connection, (err, cn) => {
			if(err){
				console.log(err.message);
				return res.status(500).send({
					message: 'Error de conexión'
				});
			}else{
				cn.execute(
					`BEGIN
					CreateBill(:idUser, :nameClient, :idShoppingCart, TO_DATE(:dateBill, 'DD-MM-YYYY HH24:MI:SS'), :total, :v_id);
					END;`,
					{
						idUser: idUser,
						nameClient: nameClient,
						idShoppingCart: idShoppingCart,
						dateBill: dateBill,
						total: total,
						v_id: { dir: objOracle.BIND_OUT, type: objOracle.NUMBER }
					},
					{
						autoCommit: true
					},
					(err, result) => {
						if(err){
							console.log(err.message);
							res.status(500).send();
						}else{
							res.status(200).send({
								data: result.outBinds
							});
						}
						cn.release((err) => {
							if(err) console.log(err.message);
						});
					}
				);
			}
		});
	},

	SendInvoiceToEmail: function(req, res){
		var toEmail = req.body.email;
		var idUser = req.body.idUser;
		var toName = req.body.name;
		var htmlPart = req.body.htmlPart;
		var total = req.body.total;
		mailjet.post('send', { version: 'v3.1' }).request({
			Messages:[{
				From:{
					Email: 'normalhak@gmail.com',
					Name: 'Publishes_and_Cells',
				},
				To:[
					{
						Email: toEmail,
						Name: toName
					}
				],
				Subject: 'Compra del cliente ' + idUser + ': ' + toName,
				HTMLPart: `<!DOCTYPE html>
								<html>
									<head>
										<title>Molde</title>
										<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
										<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
										<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
										<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
									</head>
									<body>
										<div class="container">` +
											htmlPart +
										    `<tr>
										      <th scope="row"></th>
										      <td></td>
										      <td></td>
										      <td>Total</td>
										      <td>Q` + total + `</td>
										    </tr>
										  </tbody>
										</table>
										</div>
									</body>
								</html>`
			}
			]
		}).then((result) => {
			return res.status(200).send({
				message: 'Correo enviado exitosamente'
			});
		}).catch((err) => {
			console.log(err);
			return res.status(500);
		});
	},

	GetRatingProduct: function(req, res){
		var idProduct = req.params.idProduct;
		db.open(`SELECT AVG(quantity) rating FROM Weighing WHERE idProduct = :idProduct`, [idProduct], false, res);
	},

	GetProductForReviews: function(req, res){
		var idProduct = req.params.idProduct;
		db.open(`SELECT description, image FROM Product WHERE id = :idProduct`, [idProduct], false, res);
	},

	GetRatingByUserForProduct: function(req, res){
		var idProduct = req.params.idProduct;
		var idUser = req.params.idUser;
		db.open(`SELECT quantity FROM Weighing WHERE idProduct = :idProduct AND idUser = :idUser`, [idProduct, idUser], false, res);
	},

	GetCommentsScoreProduct: function(req, res){
		var idProduct = req.params.idProduct;
		db.open(`SELECT w.quantity, usr.name, usr.lastName, TO_CHAR(c.creationDate, 'DD/MM/YYYY hh24:mi:ss') commentDate, c.title, c.content
				FROM Commentary c
				INNER JOIN Weighing w ON w.idUser = c.idUser
				INNER JOIN User1 usr ON usr.id = c.idUser
				WHERE c.idProduct = :idProduct`, [idProduct], false, res);
	},

	UpdateScoreUser: function(req, res){
		var idProduct = req.body.idProduct;
		var idUser = req.body.idUser;
		var quantity = req.body.quantity;
		db.open(`BEGIN
				ChangeWeighing(:idProduct, :idUser, :quantity);
				END;`, [idProduct, idUser, quantity], true, res);
	},

	InsertNewComentary: function(req, res){
		var creationDate = req.body.creationDate;
		var title = req.body.title;
		var content = req.body.content;
		var idUser = req.body.idUser;
		var idProduct = req.body.idProduct;
		db.open(`INSERT INTO Commentary(id, creationDate, title, content, idUser, idProduct)
			VALUES(sec_idCommentary.nextval, TO_DATE(:creationDate, 'DD/MM/YYYY hh24:mi:ss'), :title, :content, :idUser, :idProduct)`, [creationDate, title, content, idUser, idProduct], true, res);
	}	

}

module.exports = controller;