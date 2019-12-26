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
							'<h3>Enlace</h3>'
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
	}

}

module.exports = controller;