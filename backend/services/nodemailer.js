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
        const resetBase = ENV.FRONTEND_URL || 'http://localhost:5173';
        const verificationLink = `${resetBase}/reset-password/${token}`;

        const mailOptions = {
            from: ENV.EMAIL_USER,
            to: user.email,
            subject: 'Réinitialisation de mot de passe',
            
            html: `<p>Bonjour ${user.nom},</p>
            <p> Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p> Ce lien expirera dans 1 heure.</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};

const sendVerificationEmail = async (user, token) => {
    try {
        const backBase = ENV.BACKEND_PUBLIC_URL || 'http://localhost:8000';
        const verificationLink = `${backBase}/api/users/verify-email/${token}`;
        const mailOptions = {
            from: ENV.EMAIL_USER,
            to: user.email,
            subject: 'Vérification de votre compte',
            html: `<p>Bonjour ${user.nom},</p>
            <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse e-mail :</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>Ce lien expirera dans 1 heure.</p>
            <p>Si vous n'avez pas créé de compte, veuillez ignorer cet e-mail.</p>
            <p>Cordialement,</p>
            <p>L'équipe de notre site</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
       
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
        throw error;
        
    }
}

const envoyerMessage = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: ENV.EMAIL_USER,
            to,
            subject,
            text: message,
            html: `<p>${message}</p>`
        });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        throw error;
        
    }
}
module.exports = {
    sendEmail,
    sendVerificationEmail,
    envoyerMessage
};