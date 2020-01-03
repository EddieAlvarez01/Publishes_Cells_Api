'use strict'

var express = require('express');
var HomeController = require('../controllers/home');

var router = express.Router();

//Midlewares connect-multiparty
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './video' });

router.get('/getDataHome', HomeController.GetDataHome);
router.get('/getVideo/:video', HomeController.GetVideo);
router.get('/getNameLogo', HomeController.GetNameLogo);
router.put('/updateDataHome', HomeController.UpdateDataHome);
router.post('/uploadVideo', multipartMiddleware, HomeController.SaveVideoServer);

module.exports = router;