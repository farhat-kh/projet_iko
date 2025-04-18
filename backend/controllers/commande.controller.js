const Commande = require('../models/commande.model');
const createError = require('../middlewares/error');

// Creer une commande 
const createCommande = async (req, res, next) => {
    try {
        const {userId, produits, status = 'en cours',addresseLivraison, moyenPaiement = 'stripe', paiementEffectue = false,dateCommande} = req.body;
        if (!userId || !produits || produits.length === 0) {
            return next(createError(400, 'champs manquants ou produits invalides'));
        }
        const total = produits.reduce((acc, p) => acc + (p.prixUnitaire * p.quantite), 0);

        const commande = await Commande.create({
            userId,
            produits,
            total,
            status,
            addresseLivraison,
            moyenPaiement,
            paiementEffectue,
            dateCommande
        });

        const savedCommande = await commande.save();
        res.status(201).json({message: "Commande créée", commande});


    } catch (error) {
        next(createError(500,error.message));
    }
}

// Récupérer toutes les commandes

const getAllCommandes = async (req, res, next) => {
    try {
        const commandes = await Commande.find().populate('userId', 'nom prenom email').sort({createdAt: -1});
        res.status(200).json(commandes);
    } catch (error) {
        next(createError(500, error.message));
    }
}

// Récupérer une commande par ID
const getCommandById = async (req, res, next) => {
    try {
        const commande = await Commande.findById(req.params.id).populate('userId', 'nom prenom email').populate('produits.produitId', 'nom description prix imageUrl');
        // verifier si l'utilisateur est admin ou le propriétaire de la commande
        if(req.user.role !== 'admin' && req.user.role !== 'superadmin' && commande.userId._id.toString() !== req.user.id) {
            return next(createError(403, 'Accès refusé'));
        }
        
        if (!commande) return next(createError(404, 'Commande non trouvée'));
        res.status(200).json(commande);
    } catch (error) {
        next(createError(500, error.message));
    }
}

// recuperer les commandes d'un utilisateur
const getCommandesByUser = async (req, res, next) => {
    try {
        const commandes = await Commande.find({ userId: req.user.id}).populate('produits.produitId', 'nom prix imageUrl').sort({createdAt: -1});

        if(!commandes || commandes.length === 0) return next(createError(404, 'Aucune commande trouvée'));
        res.status(200).json(commandes);
    } catch (error) {
        next(createError(500, error.message));
    }
}








// Mettre a jour le status de la commande 
const updateCommandeStatus = async (req, res, next) => {
    try {
        const commande = await Commande.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true});
        
        if (!commande) return next(createError(404, 'Commande non trouvée'));

        // verifier les autorisations
        if(req.user.role !== 'admin' && req.user.role !== 'superadmin' && commande.userId._id.toString() !== req.user.id) {
            return next(createError(403, 'Accès refusé'));
        }
        // si user , il ne peut que modifier son status
        if(req.user.role === "user" && req.body.status !== "annuler") { return next(createError(403, 'Vous ne pouvez que annuler votre commande')); }
        // mettre a jour le status de la commande 
        commande.status = req.body.status || commande.status;

        const updatedCommande = await commande.save();
        res.status(200).json({message: "Commande mise à jour", commande: updatedCommande});

    } catch (error) {
        next(createError(500, error.message));
        
    }
}



// supprimer la commande
const deleteCommande = async (req, res, next) => {
    try {
      const commande = await Commande.findById(req.params.id);
  
      if (!commande) return next(createError(404, 'Commande non trouvée'));
  
      // Vérification des autorisations
      const isOwner = commande.userId.toString() === req.user.id;
      const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
  
      if (!isAdmin && !isOwner) {
        return next(createError(403, 'Accès refusé'));
      }
  
      // Si c'est un user simple, il ne peut supprimer que les commandes "en cours"
      if (!isAdmin && commande.status !== 'en cours') {
        return next(createError(403, 'Vous ne pouvez supprimer que les commandes en cours'));
      }
  
      await Commande.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Commande supprimée" });
  
    } catch (error) {
      next(createError(500, error.message));
    }
  };
  



module.exports = {
    createCommande,
    getAllCommandes,
    getCommandById,
    getCommandesByUser,
    updateCommandeStatus,
    deleteCommande
}
