'use strict'

var db = require("../dao");

var controller = {

	GetHelpDeskYear: function(req, res){
		var year = req.params.year;
		db.open(`SELECT usr.name, usr.lastname, usr.email, usr.gender, TO_CHAR(usr.birthDay, 'DD/MM/YYYY') fechaNac, r.name rol
				FROM User1 usr
				INNER JOIN Role r ON r.id = usr.idRole
				WHERE EXTRACT(year FROM birthDay) > :year AND usr.gender = 'M' AND r.id = 2`, [year], false, res);
	}

}

module.exports = controller;