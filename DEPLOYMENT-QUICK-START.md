# Guide de Deploiement Rapide

## Architecture Simplifiee

- **CI (Tests)** : GitHub Actions automatique
- **CD (Deploiement)** : Render Auto-Deploy

## Prerequis

1. Repository GitHub avec le code
2. Compte Render.com
3. Compte MongoDB Atlas

## Etape 1: Configuration MongoDB Atlas

1. Creez un compte MongoDB Atlas
2. Creez un nouveau cluster
3. Creez un utilisateur de base de donnees
4. Autorisez toutes les IP (0.0.0.0/0)
5. Recuperez la chaine de connexion

## Etape 2: Creation des Services Render

### Service Backend

1. **Nouveau Web Service**
   - Repository : Connectez votre GitHub
   - Branch : `main`
   - Root Directory : Laissez vide
   - Build Command : `cd backend && npm install`
   - Start Command : `cd backend && npm start`

2. **Auto-Deploy (IMPORTANT)**
   - Settings > Auto-Deploy : `Yes`
   - Branch : `main`

3. **Variables d'environnement**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
   TOKEN=votre-secret-jwt-32-caracteres
   DB_NAME=ikomeubles
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASS=votre-mot-de-passe-app-gmail
   PAYPAL_CLIENT_ID=votre-paypal-client-id
   PAYPAL_CLIENT_SECRET=votre-paypal-secret
   ```

### Service Frontend

1. **Nouveau Static Site**
   - Repository : Meme GitHub repository
   - Branch : `main`
   - Build Command : `cd frontend && npm install && npm run build`
   - Publish Directory : `frontend/dist`

2. **Auto-Deploy (IMPORTANT)**
   - Settings > Auto-Deploy : `Yes`
   - Branch : `main`

3. **Variables d'environnement**
   ```
   VITE_API_URL=https://votre-backend.onrender.com/api
   VITE_NODE_ENV=production
   ```

## Etape 3: Test du Deploiement

1. Poussez le code sur la branche main
2. Render deploie automatiquement
3. Verifiez que les services fonctionnent
4. Testez les fonctionnalites de l'application

## Avantages de cette Configuration

- **Aucun secret GitHub necessaire**
- **Deploiement automatique sur push**
- **Tests automatiques via GitHub Actions**
- **Configuration simple et rapide**

## Surveillance

- Endpoint de sante : `https://votre-backend.onrender.com/api/health`
- GitHub Actions : Repository > onglet Actions (tests uniquement)
- Logs Render : Tableau de bord du service > Logs

## Depannage

### Echec du Build
- Verifiez les logs Render
- Verifiez que toutes les variables d'environnement sont definies
- Verifiez la chaine de connexion MongoDB

### Problemes CORS
- Mettez a jour la configuration CORS dans le backend
- Assurez-vous que l'URL du frontend est autorisee
