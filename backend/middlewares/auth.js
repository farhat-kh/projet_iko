const jwt = require('jsonwebtoken');
const ENV = require('../config/env');
const createError = require('./error')

const verifieToken = async (req, res, next) =>{
    // recupere le jeton (token) jwt a partir des cookies de la requete
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    // si le token n'est pas present , on renvoie une erreur (accès refusé)
    if(!token) return next(createError(401,'Access denied'))
    
        try {
            // decodage du token pour recuperer les informations de l'utilisateur
            const user = jwt.verify(token, ENV.TOKEN);
            req.user = user;
            next();
        }   catch (error) {
            // si une erreur se produit lors de la verification du token
            // on renvoie une erreur 403 (interdit)
            return next(createError(403,'token non valide ', error.message))
        }
    
}

module.exports = verifieToken;