'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.post('/registerUser', UserController.RegisterUser);
router.post('/sendEmailRegister', UserController.SendEmail_Confirmation);
router.post('/loginUser', UserController.LoginUser);
router.put('/emailConfirm/:email', UserController.EmailConfirmation);
router.post('/registerProduct', UserController.BulkLoad);
router.get('/getUserForEdit/:idUser', UserController.GetUserForEdit);
router.put('/updateUserProfile', UserController.UpdateUser);
router.get('/getUserCrud', UserController.GetUserCrud);
router.put('/updateUserCrud', UserController.UpdateUserCrud);
router.delete('/deleteUser/:idUser', UserController.DeleteUserCrud);
router.get('/getUserForCrud/:idUser', UserController.GetUserUpdate);
router.get('/getAllHelpDesk', UserController.GetAllHelpDesk);
router.post('/newRatingUser', UserController.RatingUser);
router.put('/updateStatus', UserController.UpdateState);

module.exports = router;