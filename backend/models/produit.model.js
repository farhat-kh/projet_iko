const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    quantite: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: false,

    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true,
        enum: ["tables", "assises", "lits", "rangements", "canapes", "buffets"],

    }
}, {
    timestamps: {
        createdAt: true
    },
    dateAjout: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model("Produit", produitSchema);