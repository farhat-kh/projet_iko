# API Reference - Projet IKO

## Base URL
```
http://localhost:8000/api
```

## Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Les tokens sont stockés dans des cookies sécurisés.

### Headers requis
```
Content-Type: application/json
```

## Routes Utilisateurs (`/api/user`)

### POST `/register`
Créer un nouvel utilisateur

**Body:**
```json
{
  "nom": "string",
  "prenom": "string", 
  "email": "string",
  "password": "string (min 12 caractères)",
  "telephone": "string (optionnel)"
}
```

**Réponse (201):**
```json
{
  "message": "Utilisateur créé avec succès.",
  "user": {
    "id": "string",
    "nom": "string",
    "prenom": "string",
    "email": "string"
  }
}
```

### POST `/login`
Connexion utilisateur

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Réponse (200):**
```json
{
  "message": "User signed in successfully",
  "user": {
    "id": "string",
    "nom": "string",
    "prenom": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

### GET `/logout`
Déconnexion (nécessite authentification)

### GET `/verify-email/:token`
Vérification de l'email

### PUT `/forgot-password`
Demande de réinitialisation de mot de passe

**Body:**
```json
{
  "email": "string"
}
```

### PUT `/reset-password/:token`
Réinitialisation du mot de passe

**Body:**
```json
{
  "newPassword": "string"
}
```

### PUT `/update-password/:id`
Modification du mot de passe (nécessite authentification)

**Body:**
```json
{
  "ancienMotDePasse": "string",
  "nouveauMotDePasse": "string"
}
```

### GET `/all`
Récupérer tous les utilisateurs (admin uniquement)

### GET `/:id`
Récupérer un utilisateur par ID

### PUT `/update/:id`
Modifier un utilisateur (nécessite authentification)

### DELETE `/delete/:id`
Supprimer un utilisateur (nécessite authentification)

## Routes Produits (`/api/produit`)

### GET `/`
Récupérer tous les produits

### GET `/:id`
Récupérer un produit par ID

### POST `/`
Créer un produit (admin uniquement)

### PUT `/:id`
Modifier un produit (admin uniquement)

### DELETE `/:id`
Supprimer un produit (admin uniquement)

## Routes Catégories (`/api/categorie`)

### GET `/`
Récupérer toutes les catégories

### POST `/`
Créer une catégorie (admin uniquement)

### PUT `/:id`
Modifier une catégorie (admin uniquement)

### DELETE `/:id`
Supprimer une catégorie (admin uniquement)

## Routes Messages (`/api/messages`)

### GET `/`
Récupérer tous les messages (admin uniquement)

### POST `/`
Envoyer un message de contact

**Body:**
```json
{
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "commentaire": "string"
}
```

### DELETE `/:id`
Supprimer un message (admin uniquement)

## Routes Commandes (`/api/commande`)

### GET `/`
Récupérer toutes les commandes (admin uniquement)

### POST `/`
Créer une commande (nécessite authentification)

### GET `/user/:userId`
Récupérer les commandes d'un utilisateur

### PUT `/:id/status`
Modifier le statut d'une commande (admin uniquement)

## Codes d'erreur

- `400` - Bad Request (données invalides)
- `401` - Unauthorized (non authentifié)
- `403` - Forbidden (accès refusé)
- `404` - Not Found (ressource non trouvée)
- `500` - Internal Server Error (erreur serveur)

## Format des erreurs

```json
{
  "error": {
    "status": 400,
    "message": "Description de l'erreur",
    "details": "Détails supplémentaires (optionnel)"
  }
}
```

## Middleware d'authentification

Certaines routes nécessitent une authentification. Le token JWT doit être présent dans :
- Cookie `access_token`, ou
- Header `Authorization: Bearer <token>`

## Rôles utilisateur

- `user` : Utilisateur standard
- `admin` : Administrateur
- `superadmin` : Super administrateur

Les permissions sont vérifiées automatiquement par les middlewares appropriés.
