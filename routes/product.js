'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var router = express.Router();

router.get('/getAllCategories', ProductController.GetAllCategories);
router.get('/getAllProduct_AllCategories', ProductController.GetAllProducts);
router.get('/getAllProductNoLogedByCategory/:idCategory', ProductController.GetProductNoLogedByCategory);
router.get('/getAllProductsNoLoggedMatch/:match', ProductController.GetProductsNoLoggedByMatch);
router.get('/getAllProductsNoLoggedMatchByCategory/:idCategory/:match', ProductController.GetProductsNoLoggedByMatchByCategory);
router.get('/getProductId/:id', ProductController.GetProductById);
router.get('/getProductsUser/:idUser', ProductController.GetAllProductsForUser);
router.get('/getProductsUserByCategory/:idUser/:idCategory', ProductController.GetAllProductsForUserByCategory);
router.get('/getProductsUserMatch/:idUser/:match', ProductController.GetAllProductsForUserMatch);
router.get('/getProductsUserMatchByCategory/:idUser/:idCategory/:match', ProductController.GetAllProductsForUserMatchByCategory);

module.exports = router;