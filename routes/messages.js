const express = require('express');

const messagesController = require('../controllers/messages');

const router = express.Router();

router.post('/', messagesController.postMessage);

router.get('/', messagesController.getMessage);

module.exports = router;
