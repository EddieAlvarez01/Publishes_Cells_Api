'use strict'

var fs = require('fs');
var path = require('path');

var controller = {

	GetImage: function(req, res){
		var file = req.params.image;
		var path_file = './img/' + file;
		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(500).send({
					message: "No existe la imagen"
				});
			}
		});
	},

	SaveImagesServer: function(req, res){
		var fileName = "Imagen no subida";
		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			return res.status(200).send({
				image: fileName
			});
		}else{
			return res.status(500).send({
				message: fileName
			});
		}
	}

}

module.exports = controller;