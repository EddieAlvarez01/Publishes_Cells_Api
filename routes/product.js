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
router.post('/addProductToCart', ProductController.AddProductCart);
router.get('/VerifyProductCart/:idShoppingCart/:idProduct', ProductController.VerifyCart);
router.get('/getProductsShoppingCart/:idShoppingCart', ProductController.GetProductShoppingCart);
router.delete('/deleteProductCart/:idShoppingCart/:idProduct', ProductController.DeleteProductCart);
router.post('/sendEmailBill', ProductController.SendInvoiceToEmail);
router.post('/buyProducts', ProductController.BuyProducts);
router.get('/getRatingProduct/:idProduct', ProductController.GetRatingProduct);
router.get('/getProductForReview/:idProduct', ProductController.GetProductForReviews);
router.get('/GetRatingByUserForProduct/:idProduct/:idUser', ProductController.GetRatingByUserForProduct);
router.get('/GetCommentaryProduct/:idProduct', ProductController.GetCommentsScoreProduct);
router.post('/UpdateScoreByUserForProduct', ProductController.UpdateScoreUser);
router.post('/InsertNewCommentary', ProductController.InsertNewComentary);
router.get('/getAllCategoriesForCrud', ProductController.GetAllProductsForCrud);
router.post('/createCategory', ProductController.CreateCategoryCrud);
router.put('/updateCategory', ProductController.UpdateCategoryCrud);
router.delete('/deleteCategory/:idCategory', ProductController.DeleteCategoryCrud);
router.get('/getCategoryByid/:idCategory', ProductController.GetCategoryById);

module.exports = router;