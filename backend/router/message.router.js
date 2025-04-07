const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const verifieAdmin = require('../middlewares/verifieAdmin');




// Route pour le formulaire de contact
// Route pour envoyer un message
router.post("/", messageController.postMessage);
// Route pour afficher les messages
router.get("/", verifieAdmin,  messageController.getAllMessages); // pour l'admin
// Route pour supprimer un message
router.delete("/:id", verifieAdmin, messageController.deleteMessage); // pour l'admin

module.exports = router;