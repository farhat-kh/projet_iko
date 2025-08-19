# Installation - Projet IKO

## Prérequis

### Logiciels requis
- **Node.js** (version 18 ou supérieure)
- **pnpm** (gestionnaire de paquets recommandé)
- **MongoDB** (version 6 ou supérieure)
- **Git**

### Installation des prérequis

#### Node.js et pnpm
```bash
# Installation de Node.js (via nvm recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Installation de pnpm
npm install -g pnpm
```

#### MongoDB
```bash
# macOS (avec Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Windows
# Télécharger depuis https://www.mongodb.com/try/download/community
```

## Installation du projet

### 1. Cloner le repository
```bash
git clone <repository-url>
cd projet_iko
```

### 2. Installation des dépendances

#### Backend
```bash
cd backend
pnpm install
```

#### Frontend
```bash
cd ../frontend
pnpm install
```

### 3. Configuration des variables d'environnement

#### Backend
```bash
cd backend
cp .env.example .env
```

Éditez le fichier `.env` avec vos configurations :
```env
# Server Configuration
PORT=8000
NOM_DOMAIN=localhost
PORT_APPLICATION_FRONT=5173

# Database Configuration
DB_NAME=ikomeubles
MONGO_URI=mongodb://localhost:27017
MONGO_URI_LOCAL=mongodb://localhost:27017

# JWT Configuration
TOKEN=votre_cle_secrete_jwt_minimum_32_caracteres

# Email Configuration (Gmail SMTP)
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application

# Environment
NODE_ENV=development
```

#### Frontend
```bash
cd ../frontend
cp .env.example .env
```

Éditez le fichier `.env` :
```env
# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=votre_client_id_paypal

# API Configuration
VITE_API_URL=http://localhost:8000/api

# Environment
VITE_NODE_ENV=development
```

### 4. Configuration de la base de données

#### Démarrer MongoDB
```bash
# macOS (avec Homebrew)
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl enable mongod

# Windows
# Démarrer le service MongoDB depuis les services Windows
```

#### Vérifier la connexion
```bash
mongosh mongodb://localhost:27017
```

### 5. Configuration email (Gmail)

Pour utiliser Gmail SMTP :

1. Activez l'authentification à 2 facteurs sur votre compte Gmail
2. Générez un mot de passe d'application :
   - Allez dans les paramètres Google
   - Sécurité → Authentification à 2 facteurs → Mots de passe des applications
   - Générez un mot de passe pour "Mail"
3. Utilisez ce mot de passe dans `EMAIL_PASS`

### 6. Configuration PayPal (optionnel)

1. Créez un compte développeur PayPal : https://developer.paypal.com
2. Créez une application dans le dashboard
3. Récupérez le Client ID et ajoutez-le dans `VITE_PAYPAL_CLIENT_ID`

## Démarrage de l'application

### 1. Démarrer le backend
```bash
cd backend
pnpm run dev
```

Le serveur démarre sur http://localhost:8000

### 2. Démarrer le frontend
```bash
cd frontend
pnpm run dev
```

L'application démarre sur http://localhost:5173

## Vérification de l'installation

### 1. Test de l'API
```bash
curl http://localhost:8000/api/user/all
```

Réponse attendue : erreur 403 (normal, route protégée)

### 2. Test de création d'utilisateur
```bash
curl -X POST http://localhost:8000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User", 
    "email": "test@example.com",
    "password": "motdepassetest123"
  }'
```

### 3. Vérifier la base de données
```bash
mongosh mongodb://localhost:27017/ikomeubles
db.users.find()
```

### 4. Accéder au frontend
Ouvrez http://localhost:5173 dans votre navigateur

## Résolution des problèmes courants

### Erreur bcrypt
Si vous rencontrez des erreurs avec bcrypt :
```bash
cd backend
pnpm remove bcrypt
pnpm add bcryptjs
# Modifier les imports dans le code si nécessaire
```

### Port déjà utilisé
```bash
# Trouver le processus utilisant le port
lsof -i :8000
lsof -i :5173

# Tuer le processus
kill -9 <PID>
```

### MongoDB ne démarre pas
```bash
# Vérifier le statut
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux

# Redémarrer
brew services restart mongodb-community  # macOS
sudo systemctl restart mongod            # Linux
```

### Problèmes de permissions
```bash
# Réinitialiser les permissions npm
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

## Scripts disponibles

### Backend
- `pnpm start` : Démarrer en production
- `pnpm run dev` : Démarrer en développement avec nodemon
- `pnpm test` : Lancer les tests

### Frontend
- `pnpm run dev` : Démarrer le serveur de développement
- `pnpm run build` : Construire pour la production
- `pnpm run preview` : Prévisualiser la build de production
- `pnpm run lint` : Lancer ESLint

## Structure après installation

```
projet_iko/
├── backend/
│   ├── node_modules/
│   ├── .env
│   └── ...
├── frontend/
│   ├── node_modules/
│   ├── .env
│   └── ...
└── docs/
```

## Prochaines étapes

1. Consultez [CONFIGURATION.md](./CONFIGURATION.md) pour la configuration avancée
2. Lisez [API.md](./API.md) pour comprendre l'API
3. Voir [DATABASE.md](./DATABASE.md) pour la gestion de la base de données
