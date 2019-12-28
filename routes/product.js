'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var router = express.Router();

router.get('/getAllCategories', ProductController.GetAllCategories);

module.exports = router;