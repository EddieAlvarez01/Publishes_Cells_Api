'use strict'

var objOracle = require('oracledb');
objOracle.outFormat = objOracle.OBJECT;

var connection =  {
	user: "db_Publishes_Sells",
	password: "SDnlbI",
	connectString: "localhost:1521/xe"
}

function open(sql, binds, dml, res){
	objOracle.getConnection(connection, function(err, cn){
		if(err){
			console.log(err.message);
			return res.status(500).send({
				message: 'error de conexion'
			});
		}else{
			cn.execute(sql, binds, {autoCommit: dml}, (err, result) => {
				if(err){
					console.log(err.message);
					res.status(500).send({
						message: 'Error en el servidor'
					});
				}else{
					if(dml){
						res.status(200).send({
							rows: result.rowsAffected
						});
					}else{
						res.status(200).send({
							rows: result.rows
						});
					}
				}
				close(cn);
			});
		}
	});
}

function close(cn){
	cn.release((err) => {
		if(err) console.log(err.message);
	});
}

exports.open = open;
exports.close = close;