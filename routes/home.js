'use strict'

var express = require('express');
var HomeController = require('../controllers/home');

var router = express.Router();

router.get('/getDataHome', HomeController.GetDataHome);
router.get('/getVideo/:video', HomeController.GetVideo);

module.exports = router;