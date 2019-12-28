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
	}

}

module.exports = controller;