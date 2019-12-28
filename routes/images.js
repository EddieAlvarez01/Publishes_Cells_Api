'use strict'

var express = require('express');
var ImagesController = require('../controllers/images');

var router = express.Router();

router.get('/get-image/:image', ImagesController.GetImage);

module.exports = router;