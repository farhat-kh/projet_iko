const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.post("/contact", messageController.postMessage);
router.get("/messages", messageController.getAllMessages); // pour l'admin

module.exports = router;