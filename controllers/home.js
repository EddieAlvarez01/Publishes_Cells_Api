'use strict'

var fs = require('fs');
var path = require('path');
var db = require("../dao");

var controller = {

	GetDataHome: function(req, res){
		
		db.open(`SELECT video, mision, vision, aboutMe FROM HomePage
				WHERE id = 1`, [], false, res);
	},

	GetNameLogo: function(req, res){
		db.open(`SELECT logo FROM HomePage`, [], false, res);
	},

	GetVideo: function(req, res){
		var file = req.params.video;
		var path_file = './video/' + file;
		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(500).send({
					message: "No existe el video"
				});
			}
		});
	}

}

module.exports = controller;