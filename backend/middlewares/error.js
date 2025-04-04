const createError = (status, message, details = null) => {
    // Cree une  nouvelle instance d'erruer vide 
    const error = new Error(message);
    /**
     * Definit le code d'etat de l'erreur en focntion du parametre 'status
     */
    error.status = status
    // definit le message d'erreur en fonction du parametre "message"
    error.details = details // permet d'ajouter des infos supplementaires si besoin
    return error // renvoie d'erreur personnalisée
}

module.exports = createError;