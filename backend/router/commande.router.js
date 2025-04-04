const express = require('express');
const router = express.Router();


const verifieToken = require('../middlewares/auth')

const commandeController = require("../controllers/commande.controller");

router.post("/add", commandeController.postCommande);
router.get("/all", commandeController.getAllCommandes);
router.get("/:id", commandeController.getCommande);
router.delete("/delete/:id" , verifieToken, commandeController.deleteCommande);
router.put("/update/:id" , verifieToken, commandeController.updateCommande);



module.exports = router;