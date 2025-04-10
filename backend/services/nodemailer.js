const nodemailer = require('nodemailer');
const ENV = require('../config/env');
console.log(ENV.EMAIL_PASS,ENV.EMAIL_PASS);

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
        const verificationLink = `${ENV.NOM_DOMAIN}/${token}`;

        const mailOptions = {
            from: ENV.EMAIL_PASS,
            to: user.email,
            subject: 'Vérification de compte',
            // text: 'Bonjour, veuillez vérifier votre compte en cliquant sur le lien suivant :',
            html: `<p>Bonjour, veuillez vérifier votre compte en cliquant sur le lien suivant : <a href="${verificationLink}">Vérifier mon compte</a></p>`
        };
        console.log('Envoi de l\'email à:', user.email);
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};

module.exports = sendEmail;