const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    commentaire: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: true
    }
});

module.exports = mongoose.model('Message', messageSchema);