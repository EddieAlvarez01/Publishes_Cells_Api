'use strict'

var db = require("../dao");

var objOracle = require('oracledb');
objOracle.outFormat = objOracle.OBJECT;

var connection =  {
	user: "db_Publishes_Sells",
	password: "SDnlbI",
	connectString: "localhost:1521/xe"
}

var controller = {

	GetRoomChat: function(req, res){
		var idUser = req.params.idUser;
		db.open(`SELECT idRoom FROM RoomUser WHERE idUser = :idUser`, [idUser], false, res);
	},

	CreateRoomUser: function(req, res){
		var idHelpDesk = req.body.idHelpDesk;
		var idUser = req.body.idUser;
		objOracle.getConnection(connection, (err, cn) => {
			if(err){
				console.log(err.message);
				return res.status(500).send({
					message: 'Error de conexión'
				});
			}else{
				cn.execute(
					`BEGIN
						CreateRoomUser(:idHelpDesk, :idUser, :v_id);
					END;`,
					{
						idHelpDesk: idHelpDesk,
						idUser: idUser,
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

	GetAllMessagesRoom: function(req, res){
		var idRoom = req.params.idRoom;
		db.open(`SELECT m.idUser, m.content, usr.photo
				FROM Message m
				INNER JOIN User1 usr ON usr.id = m.idUser
				WHERE m.idRoom = :idRoom
				ORDER BY m.creationDate ASC`, [idRoom], false, res);
	},

	CreateNewMessage: function(req, res){
		var idUser = req.body.idUser;
		var idRoom = req.body.idRoom;
		var content = req.body.content;
		db.open(`INSERT INTO Message(id, idUser, idRoom, content, creationDate)
				VALUES(sec_idMessage.nextval, :idUser, :idRoom, :content, SYSDATE)`, [idUser, idRoom, content], true, res);
	},

	GetHelpDeskRoom: function(req, res){
		var idRoom = req.params.idRoom;
		db.open(`SELECT r.idUser, usr.name, usr.lastname
				FROM RoomUser r 
				INNER JOIN User1 usr ON usr.id = r.idUser
				WHERE r.idRoom = :idRoom`, [idRoom], false, res);
	}

}

module.exports = controller;