const verifieToken = require('./auth');
const createError = require('./error')

const verifieAdmin = (req, res, next) => {
    verifieToken(req, res, () => {
      if (req.user && req.user.role === "admin") {
        next();
      } else {
        return next(createError(403, "Accès refusé : admin uniquement"));
      }
    });
  };
  


module.exports = verifieAdmin;