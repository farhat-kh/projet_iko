const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    produits: [
        {
            produitId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produit',
                required: true
            },
            quantite: {
                type: Number,
                required: true,
                min: 1
            },
            prixUnitaire: {
                type: Number,
                required: true
            }

    }],
    
    total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['en cours', 
        'validée', 
        'annuler'
        ],
        default: 'en cours'
    },
    adresseLivraison: {
        type: String,
        required: false
    },
    moyenPaiement: {
        type: String,
        enum: ['carte', 'paypal'],
        required: false,
        
    },
    paiementEffectue: {
        type: Boolean,
        default: false
    },
    dateCommande: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: true
    }
});

module.exports = mongoose.model('Commande', commandeSchema);