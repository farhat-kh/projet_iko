# Projet IKO - Application E-commerce de Meubles

## Vue d'ensemble

Projet IKO est une application e-commerce complète pour la vente de meubles, développée avec une architecture moderne fullstack.

## Architecture

- **Frontend**: React.js avec Vite, Bootstrap, Tailwind CSS
- **Backend**: Node.js avec Express.js
- **Base de données**: MongoDB
- **Authentification**: JWT avec cookies sécurisés
- **Email**: Nodemailer avec Gmail SMTP
- **Paiement**: PayPal Integration

## Structure du projet

```
projet_iko/
├── backend/                 # API REST Node.js
│   ├── config/             # Configuration (DB, env)
│   ├── controllers/        # Logique métier
│   ├── middlewares/        # Middlewares (auth, error, logging)
│   ├── models/            # Modèles MongoDB
│   ├── router/            # Routes API
│   ├── services/          # Services (email)
│   ├── tests/             # Tests unitaires
│   ├── app.js             # Configuration Express
│   └── server.js          # Point d'entrée serveur
├── frontend/               # Application React
│   ├── public/            # Assets statiques
│   ├── src/               # Code source React
│   │   ├── components/    # Composants React
│   │   ├── utils/         # Utilitaires (context, services)
│   │   └── styles/        # Styles CSS
│   └── vite.config.js     # Configuration Vite
└── docs/                  # Documentation
```

## Fonctionnalités

### Authentification et Utilisateurs
- Inscription avec vérification email
- Connexion/Déconnexion sécurisée
- Gestion des rôles (user, admin, superadmin)
- Réinitialisation de mot de passe
- Profil utilisateur

### Gestion des Produits
- Catalogue de produits avec catégories
- Recherche et filtrage
- Gestion des images
- Administration des produits

### E-commerce
- Panier d'achat persistant
- Système de commandes
- Intégration PayPal
- Historique des commandes

### Administration
- Dashboard administrateur
- Gestion des utilisateurs
- Gestion des produits et catégories
- Gestion des commandes
- Système de messages/contact

## Installation et Configuration

Voir les fichiers de documentation spécifiques :
- [Installation](./INSTALLATION.md)
- [Configuration](./CONFIGURATION.md)
- [API Reference](./API.md)
- [Base de données](./DATABASE.md)

## Démarrage rapide

1. **Backend**:
   ```bash
   cd backend
   pnpm install
   pnpm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```

3. **Accès**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api

## Variables d'environnement

Copiez les fichiers `.env.example` et configurez vos variables :
- `backend/.env.example` → `backend/.env`
- `frontend/.env.example` → `frontend/.env`

## Tests

```bash
cd backend
pnpm test
```

## Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions de déploiement.

## Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence privée.
