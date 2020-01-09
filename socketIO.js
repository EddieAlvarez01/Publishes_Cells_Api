var socketIO = require('socket.io');

let io;

let coupleUsers = [];

function initialize(httpServer){
	io = socketIO(httpServer);
	io.on('connection', socket => handler(socket) );
}

function handler(socket){

	socket.on('join', (data) => {
		socket.join(data.idRoom);
	});

	socket.on('message', (data) => {
		io.in(data.idRoom).emit('new-message', data);
	});
}

module.exports.initialize = initialize;