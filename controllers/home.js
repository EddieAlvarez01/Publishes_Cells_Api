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
	},

	UpdateDataHome: function(req, res){
		var mision = req.body.mision;
		var vision = req.body.vision;
		var aboutme = req.body.aboutme;
		db.open(`UPDATE HomePage 
				SET mision = :mision, vision = :vision, aboutMe = :aboutme
				WHERE id = 1`, [mision, vision, aboutme], true, res);
	},

	SaveVideoServer: function(req, res){
		var fileName = "Video no subido";
		if(req.files){
			var filePath = req.files.video.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			return res.status(200).send({
				video: fileName
			});
		}else{
			return res.status(500).send({
				message: fileName
			});
		}
	}

}

module.exports = controller;