'use strict'

var app = require('./app');
var port = 3700;

app.listen(port)
	.on('listening', () => {
		console.log("Servidor corriendo en 'localhost:3700'");
	})
	.on('error', error => {
		reject(error);
	});