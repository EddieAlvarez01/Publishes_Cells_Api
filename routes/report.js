'use strict'

var express = require('express');
var ReportController = require('../controllers/report');

var router = express.Router();

router.get('/getHelDeskMaleAboveYear/:year', ReportController.GetHelpDeskYear);
router.get('/getAdminYear/:year', ReportController.GetAdminYear);
router.get('/getUsersHigherProfit', ReportController.GetHigherProfit);
router.get('/getProductsByWeighing/:score', ReportController.GetProductsByWeighing);
router.get('/getTop3Products', ReportController.GetTop3BestProducts);
router.get('/getTop3Customers', ReportController.GetTop3Customers);
router.get('/getProductsComments/:date', ReportController.GetProductsComments);
router.get('/getProductsStock/:quantity', ReportController.GetProductsStock);
router.get('/getProductsRatingTop3', ReportController.GetProductsRatingTop3);

module.exports = router;