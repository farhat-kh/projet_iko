const nodemailer = require('nodemailer');
const ENV = require('../config/env');


const transporter = nodemailer.createTransport({
    // configuration de server de l'envoi de mail SMTP
    host: 'smtp.gmail.com',
    port: 587, // 465 pour SSL, 587 pour TLS
    secure: false, // true pour 465, false pour les autres ports
    auth: { // configuration de l'authentification avec les identifiants de l'envoi de mail
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
    },
    timeout: 60000 // augmentez le délai de timeout à 30 secondes
});
transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur de connexion au serveur SMTP:', error);
    } else {
        console.log('Connexion au serveur SMTP réussie');
    }
    transporter.close(); // Ferme la connexion au serveur SMTP
    // transporter.close(); // Ferme la connexion au serveur SMTP
});

const sendEmail = async(user, token) => {
    try {
        const verificationLink = `http://localhost:5173/reset-password/${token}`;

        const mailOptions = {
            from: ENV.EMAIL_PASS,
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            
            html: `<p>Bonjour ${user.nom},</p>
            <p> Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p> Ce lien expirera dans 1 heure.</p>
            `
        };
        console.log('Envoi de l\'email à:', user.email);
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail
};