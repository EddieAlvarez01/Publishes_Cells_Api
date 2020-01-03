'use strict'

var express = require('express');
var ReportController = require('../controllers/report');

var router = express.Router();

router.get('/getHelDeskMaleAboveYear/:year', ReportController.GetHelpDeskYear);

module.exports = router;