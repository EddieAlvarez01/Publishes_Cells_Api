'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var socketIO = require('./socketIO');

var app = express();

var httpServer = http.createServer(app);



//cargar archivos rutas
var home_routes = require('./routes/home');
var user_routes = require('./routes/user');
var product_routes = require('./routes/product');
var images_routes = require('./routes/images');
var report_routes = require('./routes/report');
var chat_routes = require('./routes/chat');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api', home_routes);
app.use('/api', user_routes);
app.use('/api', product_routes);
app.use('/api', images_routes);
app.use('/api', report_routes);
app.use('/api', chat_routes);

socketIO.initialize(httpServer);

module.exports = httpServer;