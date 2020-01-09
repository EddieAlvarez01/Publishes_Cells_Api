'use strict'

var fs = require('fs');
var path = require('path');
var db = require("../dao");

var controller = {

	GetDataHome: function(req, res){
		
		db.open(`SELECT video, mision, vision, aboutMe, slogan FROM HomePage
				WHERE id = 1`, [], false, res);
	},

	GetNameLogo: function(req, res){
		db.open(`SELECT logo, name FROM HomePage`, [], false, res);
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
		var slogan = req.body.slogan;
		db.open(`UPDATE HomePage 
				SET mision = :mision, vision = :vision, aboutMe = :aboutme, slogan = :slogan
				WHERE id = 1`, [mision, vision, aboutme, slogan], true, res);
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
	},

	UpdateVideo: function(req, res){
		var video = req.body.video;
		db.open(`UPDATE HomePage
				SET video = :video
				WHERE id = 1`, [video], true, res);
	},

	UpdateLogo: function(req, res){
		var image = req.body.image;
		db.open(`UPDATE HomePage
				SET logo = :image
				WHERE id = 1`, [image], true, res);
	}

}

module.exports = controller;