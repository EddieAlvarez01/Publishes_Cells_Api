'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var router = express.Router();

router.get('/getAllCategories', ProductController.GetAllCategories);
router.get('/getAllProduct_AllCategories', ProductController.GetAllProducts);
router.get('/getAllProductNoLogedByCategory/:idCategory', ProductController.GetProductNoLogedByCategory);

module.exports = router;