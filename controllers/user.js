'use strict'

var db = require("../dao");
var mailjet = require('node-mailjet').connect(
	process.env.MJ_APIKEY_PUBLIC,
	process.env.MJ_APIKEY_PRIVATE
);

var controller = {
	RegisterUser: function(req, res){
		var name = req.body.name;
		var lastName = req.body.lastName;
		var password = req.body.password;
		var email = req.body.email;
		var phone = req.body.phone;
		var photo = req.body.photo;
		var gender = req.body.gender;
		var birthDay = req.body.birthDay;
		var registrationDate = req.body.registrationDate;
		var address = req.body.address;
		var availableCredit = req.body.availableCredit;
		var profitEarned = req.body.profitEarned;
		var state = req.body.state;
		var idRole = req.body.idRole;
		var idMemberClass = req.body.idMemberClass;
		db.open(`BEGIN
				RegisterUser(:name, :lastName, :password, :email, :phone, :photo, :gender, TO_DATE(:birthDay, 'DD-MM-YYYY'), TO_DATE(:registrationDate, 'DD-MM-YYYY HH24:MI:SS'),
				 :address, :availableCredit, :profitEarned, :state, :idRole, :idMemberClass);
				 END;`, [name, lastName, password, email, phone, photo, gender, birthDay, registrationDate, address, availableCredit, profitEarned, state, idRole, idMemberClass], true, res);
	},

	SendEmail_Confirmation: function(req, res){
		var toEmail = req.body.email;
		var toName = req.body.name;
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
				Subject: 'Confirmación de correo electrónico',
				HTMLPart: 'Hola ' + toName + ', de click sobre el siguiente enlace para verificar su correo electronico: <br>' +
							'<h3>http://localhost:4200/emailConfirmation/' + toEmail + '</h3>'
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

	LoginUser: function(req, res){
		var email = req.body.email;
		var password = req.body.password;
		db.open(
			`SELECT id, name, lastName, password, email, photo, TO_CHAR(registrationDate, 'DD-MM-YYYY HH24:MI:SS') registrationDate, availableCredit, state, idRole, idShoppingCart
			FROM User1
			WHERE email = :email AND password = :password`, [email, password], false, res);
	},

	EmailConfirmation: function(req, res){
		var email = req.params.email;
		db.open(`UPDATE User1 
				SET state = 2
				WHERE email = :email`, [email], true, res);
	},

	BulkLoad: function(req, res){
		var code = req.body.code;
		var img = req.body.img;
		var description = req.body.description;
		var fatherCategory = req.body.fatherCategory;
		var daughterCategory = req.body.daughterCategory;
		var price = req.body.price;
		var color = req.body.color;
		var publicationDate = req.body.publicationDate;
		var idUser = req.body.idUser;
		var stock = req.body.stock;
		console.log(req.body);
		db.open(`BEGIN
				InsertLoad(:code, :img, :description, :fatherCategory, :daughterCategory, :price, :color, TO_DATE(:publicationDate, 'DD-MM-YYYY'), :idUser, :stock);
				END;`, [code, img, description, fatherCategory, daughterCategory, price, color, publicationDate, idUser, stock], true, res);
	},

	GetUserForEdit: function(req, res){
		var idUser = req.params.idUser;
		db.open(`SELECT address, phone
				FROM User1
				WHERE id = :idUser`, [idUser], false, res);
	},

	UpdateUser: function(req, res){
		var idUser = req.body.idUser;
		var email = req.body.email;
		var name = req.body.name;
		var lastName = req.body.lastName;
		var address = req.body.address;
		var phone = req.body.phone;
		var password = req.body.password;
		var nameImg = req.body.nameImg;
		if(nameImg == null){
			db.open(`UPDATE User1
					SET name = :name, lastName = :lastName, address = :address, phone = :phone, email = :email, password = :password
					WHERE id = :idUser`, [name, lastName, address, phone, email, password, idUser], true, res);
		}else{
			db.open(`UPDATE User1
					SET name = :name, lastName = :lastName, address = :address, phone = :phone, password = :password, email = :email, photo = :nameImg
					WHERE id = :idUser`, [name, lastName, address, phone, password, email, nameImg, idUser], true, res);
		}
	},

	GetUserCrud: function(req, res){
		db.open(`SELECT usr.id, usr.name, usr.lastname, usr.email, usr.phone, usr.address, usr.state, r.name namerole 
				FROM User1 usr
				INNER JOIN Role r ON r.id = usr.idRole
				WHERE usr.id <> 1`, [], false, res);
	},

	UpdateUserCrud: function(req, res){
		var idUser = req.body.idUser;
		var name = req.body.name;
		var lastName = req.body.lastName;
		var password = req.body.password;
		var email = req.body.email;
		var phone = req.body.phone;
		var address = req.body.address; 
		db.open(`BEGIN
					updateUser(:idUser, :name, :lastName, :password, :email, :phone, :address);
				END;`, [idUser, name, lastName, password, email, phone, address], true, res);
	},

	DeleteUserCrud: function(req, res){
		var idUser = req.params.idUser;
		db.open(`BEGIN
					deleteUser(:idUser);
				END;`, [idUser], true, res);
	},

	GetUserUpdate: function(req, res){
		var idUser = req.params.idUser;
		db.open(`SELECT name, lastname, password, email, phone, address
				FROM User1
				WHERE id = :idUser`, [idUser], false, res);
	},

	GetAllHelpDesk: function(req, res){
		db.open(`SELECT id, name, lastname FROM User1 WHERE idRole = 2`, [], false, res);
	},

	RatingUser: function(req, res){
		var idHelpDesk = req.body.idHelpDesk;
		var idUser = req.body.idUser;
		var quantity = req.body.quantity;
		var idRoom = req.body.idRoom;
		db.open(`BEGIN 
					RatingUser(:idRoom, :idHelpDesk, :idUser, :quantity);
				END;`, [idRoom, idHelpDesk, idUser, quantity], true, res);
	},

	UpdateState: function(req, res){
		var idUser = req.body.idUser;
		var idAdmin = req.body.idAdmin;
		var idAction =req.body.idAction;
		db.open(`BEGIN
					ChangeStatusUser(:idUser, :idAdmin, :idAction);
				END;`, [idUser, idAdmin, idAction], true, res);
	}

}

module.exports = controller;