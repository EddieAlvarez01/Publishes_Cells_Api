'use strict'

var express = require('express');
var ImagesController = require('../controllers/images');

var router = express.Router();

//Midlewares connect-multiparty
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './img' });

router.get('/get-image/:image', ImagesController.GetImage);

module.exports = router;