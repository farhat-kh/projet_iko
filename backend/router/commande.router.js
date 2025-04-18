const express = require("express");
const router = express.Router();


// Import du middleware d'authentification
const verifieToken = require("../middlewares/auth");
const verifieAdmin = require("../middlewares/verifieAdmin");

// Import du controller
const commandeController = require("../controllers/commande.controller");





// creation de commande par user connecté 
router.post("/", verifieToken, commandeController.createCommande);

// voir toutes les commandes par l'admin 
router.get("/", verifieToken, verifieAdmin, commandeController.getAllCommandes);

// recuperer les commandes d'un utilisateur
router.get("/user", verifieToken, commandeController.getCommandesByUser);

// recuperer une commande par admin ou le propriétaire
router.get("/:id", verifieToken, commandeController.getCommandById);


// supprimer une commande par admin ou son propriétaire
router.delete("/:id", verifieToken, commandeController.deleteCommande);

// modifier le statut d'une commande par admin ou son propriétaire
router.put("/:id", verifieToken, commandeController.updateCommandeStatus);


module.exports = router;