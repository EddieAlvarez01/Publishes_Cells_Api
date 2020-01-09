'use strict'

var express = require('express');
var ChatController = require('../controllers/chat');

var router = express.Router();

router.get('/getRoomUser/:idUser', ChatController.GetRoomChat);
router.post('/createRoomUser', ChatController.CreateRoomUser);
router.get('/getAllMessagesRoom/:idRoom', ChatController.GetAllMessagesRoom);
router.post('/createNewMessage', ChatController.CreateNewMessage);
router.get('/getHelpDeskRoom/:idRoom', ChatController.GetHelpDeskRoom);

module.exports = router;