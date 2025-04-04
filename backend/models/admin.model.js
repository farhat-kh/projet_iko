const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 12,
        required: true
    },
    role: {
        type: String,
        enum:  'admin',
        default: 'admin'
    }
}, {
    timestamps: {
        createdAt: true
    }
}, {
    timestamps: {
        updatedAt: true
    }
});



module.exports = mongoose.model('Admin', adminSchema);
    