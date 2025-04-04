// const nodemailer = require('nodemailer')
// const ENV = require('../config/env')


// const transporter = nodemailer.createTransport({

//     // configuration du serveur SMTP de gmail
//     host: 'smtp.gmail.com',
//     // Port standard pour TLS (secure secret layer)
//     port: 587,
//     // Pour le TLS (port 587) true pour le SSL (Port 465)
//     secure: false,
//     // Authentification avec les identifiants Gmail
//     auth: {
//         user: ENV.EMAIL_USER,
//         pass: ENV.EMAIL_PASS
//     }
// });

// const sendEmail = async (user, verifieToken) => {
//     const verificationLink = `<a  href='${ENV.PORT_APPLICATION_FRONT}/verification/${verifieToken}'>${verifieToken}</a>`
    
//     await transporter.sendMail({
//         from: ENV.EMAIL_USER,
//         to: user.email,
//         sujet: 'Verifiez votre mail',
//         text: `hello ${user.username}, \n\n, Merci de vous etre inscrit \n\n
//         Cordialement`,
//         html: `Cliquez sur ce lien pour verifer votre eamil: ${verificationLink}`
//     }, (error, info) => {
//         if (error) {
//           console.log('Error sending email:', error);
//         } else {
//           console.log('Email sent successfully:', info);
//         }
//       });
// }

// module.exports = sendEmail;