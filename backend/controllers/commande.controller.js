const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('../middlewares/error')



// MODEL
const Commande = require('../models/commande.model')



// AJOUTER UNE COMMANDE
const postCommande = async (req, res, next) => {
    try {
        // recupere les donnees de la commande envoyees dans le corps de la requete
        const { utilisateurId, produits, total } = req.body;

        // creation de la commande
        const commande = await Commande.create({
            utilisateurId,
            produits,
            total
        });

        // Cree un jeton JWT
        const token = jwt.sign({ id: commande._id }, ENV.TOKEN, { expiresIn: '24h' });


        res.status(201).json({
            message: "Commande created successfully",
            commande
        })
    } catch (error) {
        console.log("error", error.message);
    }
}

// Verifier l'authentification

const verifieEmail = (req, res, next) => {
    try {
        const token = req.params.token;
        // on verifie si le token est valide
        const userDecodedToken = jwt.verify(token, ENV.TOKEN);
        if(!userDecodedToken) return next(createError(403,"token non valide"));

        // on verifie si l'utilisateur a deja ete verifie
        Commande.findOneAndUpdate(
            userDecodedToken.id,{isVerified: true}, {new: true});
        res.status(200).json({
            message: "User verified !! "
        })
    } catch (error) {
        console.log("error", error.message);
        
    }
}

// recupere toutes les commandes

const getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.status(200).json({
            commandes
        })
    } catch (error) {
        console.log("error", error.message);
    }
}

// recupere une commande
const getCommande = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id);
        res.status(200).json(commande);
    } catch (error) {
        console.log("error", error.message);
    }
}

// supprimer une commande
const deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if(!commande) return next(createError(404, "commande not found"));
        res.status(200).json({
            message: "Commande deleted",
            commande
        })
    } catch (error) {
        console.log("error", error.message);
    }
}

// modifier une commande
const updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdandUpdate(req.params.id, req.body, {new: true});
        if(!commande) return next(createError(404, "commande not found"));
        res.status(200).json({
            message: "Commande updated",
            commande
        })
    } catch (error) {
        console.log("error", error.message);
    }
}


module.exports = {
    postCommande,
    verifieEmail,
    getAllCommandes,
    getCommande,
    deleteCommande,
    updateCommande
}