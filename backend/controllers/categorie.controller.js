const multer = require('multer');
const createError = require('../middlewares/error');
const mongoose = require('mongoose');
const ENV = require('../config/env');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');


// Models
const Categorie = require('../models/categorie.model');

const uploadFolder = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
        console.log("Le dossier 'uploads' a éte cree avec succès.");
    } else {
        console.log("Le dossier 'uploads' existe deja.");
    }
// configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



// Ajouter une nouvelle catégorie
const postCategorie = async (req, res, next) => {
    try {
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        const { name } = req.body;

        if (!name) return next(createError(400, "Le nom de la catégorie est requis"));

        const categorie = await Categorie.create(req.body, image);
        res.status(201).json({
            message: "Catégorie créée avec succès",
            categorie 
        });
    } catch (error) {
        console.error("Erreur:", error.message);
        next(createError(500, error.message));
    }
};

// Récupérer toutes les catégories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Categorie.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Erreur:", error.message);
        next(createError(500, error.message));
    }
};

// Récupérer une catégorie par ID
const getCategorie = async (req, res, next) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        if (!categorie) return next(createError(404, "Catégorie non trouvée"));

        res.status(200).json(categorie);
    } catch (error) {
        console.error("Erreur:", error.message);
        next(createError(500, error.message));
    }
};

// Supprimer une catégorie
const deleteCategorie = async (req, res, next) => {
    try {
        const categorie = await Categorie.findByIdAndDelete(req.params.id);
        if (!categorie) return next(createError(404, "Catégorie non trouvée"));

        res.status(200).json({        
            message: "Catégorie supprimée avec succès",
            categorie
        });
    } catch (error) {
        console.error("Erreur:", error.message);
        next(createError(500, error.message));
    }
};

// Modifier une catégorie
const updateCategorie = async (req, res, next) => {
    try {
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categorie) return next(createError(404, "Catégorie non trouvée"));

        res.status(200).json({
            message: "Catégorie mise à jour avec succès",
            categorie
        });
    } catch (error) {
        console.error("Erreur:", error.message);
        next(createError(500, error.message));
    }
};

module.exports = {
    postCategorie,
    getAllCategories,
    getCategorie,
    deleteCategorie,
    updateCategorie
};


