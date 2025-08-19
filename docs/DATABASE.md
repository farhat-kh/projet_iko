# Base de données - Projet IKO

## Configuration MongoDB

### Connexion locale
```
mongodb://localhost:27017/ikomeubles
```

### Collections

#### Users
Collection pour les utilisateurs de l'application.

**Schema:**
```javascript
{
  nom: String (required),
  prenom: String (required),
  telephone: String (optional, min: 10),
  email: String (required, unique),
  password: String (required, min: 12, hashed),
  role: String (enum: ['user', 'admin', 'superadmin'], default: 'user'),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  resetToken: String (optional),
  resetTokenExpiration: Date (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Index:**
- `email` (unique)
- `resetToken`

#### Produits
Collection pour les produits du catalogue.

**Schema estimé:**
```javascript
{
  nom: String (required),
  description: String,
  prix: Number (required),
  categorie: ObjectId (ref: 'Categories'),
  images: [String],
  stock: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### Categories
Collection pour les catégories de produits.

**Schema estimé:**
```javascript
{
  nom: String (required, unique),
  description: String,
  image: String,
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### Commandes
Collection pour les commandes clients.

**Schema estimé:**
```javascript
{
  userId: ObjectId (ref: 'Users', required),
  produits: [{
    produitId: ObjectId (ref: 'Produits'),
    quantite: Number,
    prix: Number
  }],
  total: Number (required),
  statut: String (enum: ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee']),
  adresseLivraison: {
    nom: String,
    prenom: String,
    adresse: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  methodePaiement: String,
  paypalOrderId: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### Messages
Collection pour les messages de contact.

**Schema:**
```javascript
{
  nom: String (required),
  prenom: String (required),
  email: String (required),
  commentaire: String (required),
  date: Date (required),
  isRead: Boolean (default: false),
  createdAt: Date (auto)
}
```

## Commandes MongoDB utiles

### Connexion à la base
```bash
mongosh mongodb://localhost:27017/ikomeubles
```

### Vérifier les collections
```javascript
show collections
```

### Compter les documents
```javascript
db.users.countDocuments()
db.produits.countDocuments()
db.categories.countDocuments()
db.commandes.countDocuments()
db.messages.countDocuments()
```

### Créer un utilisateur admin
```javascript
db.users.insertOne({
  nom: "Admin",
  prenom: "System",
  email: "admin@ikomeubles.com",
  password: "$2b$10$hashedpassword", // Mot de passe hashé
  role: "admin",
  isActive: true,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Vérifier les index
```javascript
db.users.getIndexes()
```

### Statistiques de la base
```javascript
db.stats()
```

## Sauvegarde et restauration

### Sauvegarde
```bash
mongodump --db ikomeubles --out ./backup/
```

### Restauration
```bash
mongorestore --db ikomeubles ./backup/ikomeubles/
```

## Optimisation

### Index recommandés

**Users:**
```javascript
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "resetToken": 1 })
db.users.createIndex({ "role": 1 })
```

**Produits:**
```javascript
db.produits.createIndex({ "categorie": 1 })
db.produits.createIndex({ "nom": "text", "description": "text" })
db.produits.createIndex({ "prix": 1 })
db.produits.createIndex({ "isActive": 1 })
```

**Commandes:**
```javascript
db.commandes.createIndex({ "userId": 1 })
db.commandes.createIndex({ "statut": 1 })
db.commandes.createIndex({ "createdAt": -1 })
```

### Requêtes fréquentes optimisées

**Recherche de produits par catégorie:**
```javascript
db.produits.find({ 
  "categorie": ObjectId("..."), 
  "isActive": true 
}).sort({ "createdAt": -1 })
```

**Commandes d'un utilisateur:**
```javascript
db.commandes.find({ 
  "userId": ObjectId("...") 
}).sort({ "createdAt": -1 })
```

**Produits en stock:**
```javascript
db.produits.find({ 
  "stock": { $gt: 0 }, 
  "isActive": true 
})
```

## Monitoring

### Vérifier la santé de la base
```javascript
db.runCommand({ ping: 1 })
```

### Statistiques des opérations
```javascript
db.runCommand({ serverStatus: 1 })
```

### Logs MongoDB
```bash
tail -f /var/log/mongodb/mongod.log
```
