'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.post('/registerUser', UserController.RegisterUser);
router.post('/sendEmailRegister', UserController.SendEmail_Confirmation);
router.post('/loginUser', UserController.LoginUser);

module.exports = router;