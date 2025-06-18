const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// Middlewares
const verifieAdmin = require('../middlewares/verifieAdmin');
const verifieToken = require('../middlewares/auth');


// Admin only: voir et supprimer les messages
router.get("/", verifieToken, verifieAdmin, messageController.getAllMessages);
router.delete("/:id", verifieToken, verifieAdmin, messageController.deleteMessage);
router.post("/repondre/:id", verifieToken, verifieAdmin, messageController.repondreMessage);

//  Public: envoyer un message (pas besoin d’être connecté)
router.post("/", messageController.postMessage);

module.exports = router;