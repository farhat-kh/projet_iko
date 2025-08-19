# Guide de Configuration du Pipeline CI/CD

## Vue d'ensemble

Ce document fournit les instructions completes pour configurer le pipeline CI/CD automatise qui deploie l'application IkoMeubles sur Render.com en utilisant GitHub Actions.

## Architecture

Le pipeline se compose de :
- **GitHub Actions** : Gere les tests, le build et les declenchements de deploiement
- **Render.com** : Heberge les services backend et frontend
- **MongoDB Atlas** : Hebergement de la base de donnees (recommande)

## Secrets GitHub Requis

Configurez ces secrets dans les parametres de votre repository GitHub (Settings > Secrets and variables > Actions) :

### 1. RENDER_DEPLOY_HOOK_URL
- **Objectif** : Declenche le deploiement automatique sur Render
- **Comment l'obtenir** :
  1. Allez dans le tableau de bord de votre service Render
  2. Naviguez vers Settings > Deploy Hook
  3. Copiez l'URL du webhook
- **Exemple** : `https://api.render.com/deploy/srv-xxxxxxxxxxxxx?key=yyyyyyyyyyy`

### 2. RENDER_SERVICE_URL
- **Objectif** : Utilise pour les verifications de sante apres deploiement
- **Comment l'obtenir** : L'URL de votre service Render
- **Exemple** : `https://nom-de-votre-app.onrender.com`

### 3. MONGODB_URI (Optionnel pour les tests)
- **Objectif** : Connexion a la base de donnees pour les tests d'integration
- **Comment l'obtenir** : Depuis la chaine de connexion MongoDB Atlas
- **Exemple** : `mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/database`

## Configuration Render.com

### Configuration du Service Backend

1. **Creer un Web Service** :
   - Repository : Connectez votre repository GitHub
   - Branche : `main`
   - Repertoire racine : Laissez vide
   - Environnement : `Node`
   - Region : `Frankfurt` (ou votre region preferee)
   - Plan : `Free` (ou mise a niveau selon vos besoins)

2. **Parametres de Build** :
   - Commande de build : `cd backend && npm install`
   - Commande de demarrage : `cd backend && npm start`

3. **Variables d'Environnement** :
   ```
   NODE_ENV=production
   PORT=10000
   DB_NAME=ikomeubles
   MONGO_URI=mongodb+srv://votre-chaine-de-connexion
   TOKEN=votre-secret-jwt-minimum-32-caracteres
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASS=votre-mot-de-passe-app-gmail
   PAYPAL_CLIENT_ID=votre-paypal-client-id
   PAYPAL_CLIENT_SECRET=votre-paypal-client-secret
   ```

### Configuration du Service Frontend

1. **Creer un Static Site** :
   - Repository : Meme repository GitHub
   - Branche : `main`
   - Repertoire racine : Laissez vide
   - Commande de build : `cd frontend && npm install && npm run build`
   - Repertoire de publication : `frontend/dist`

2. **Variables d'Environnement** :
   ```
   VITE_API_URL=https://votre-service-backend.onrender.com/api
   VITE_NODE_ENV=production
   ```

## Configuration MongoDB

### MongoDB Atlas (Recommande)

1. Creez un compte MongoDB Atlas
2. Creez un nouveau cluster
3. Creez un utilisateur de base de donnees
4. Autorisez les adresses IP de Render (ou utilisez 0.0.0.0/0 pour simplifier)
5. Recuperez la chaine de connexion
6. Ajoutez-la aux variables d'environnement Render

## Workflow du Pipeline

### 1. Push de Code/Pull Request
- Le developpeur pousse le code ou cree une pull request
- GitHub Actions se declenche automatiquement

### 2. Phase de Tests
- **Tests Backend** : Execute les tests Jest et l'audit de securite
- **Tests Frontend** : Build l'application et execute les tests si disponibles
- **Audit de Securite** : Verifie les dependances vulnerables

### 3. Phase de Deploiement (branche main uniquement)
- Declenche le deploiement Render via webhook
- Attend la completion du deploiement
- Effectue une verification de sante sur le service deploye
- Envoie une notification de succes/echec

### 4. Verification de Sante
- Appelle l'endpoint `/api/health`
- Verifie que le service repond correctement
- Fait echouer le deploiement si la verification echoue

## Workflows GitHub Actions

Le pipeline est divise en trois workflows separes pour une meilleure organisation :

### 1. Tests (`tests.yml`)
- Execute les tests backend et frontend
- Se declenche sur push et pull request
- Verifie la qualite du code

### 2. Audit de Securite (`security-audit.yml`)
- Verifie les vulnerabilites des dependances
- Se declenche sur push, pull request et de maniere programmee
- Assure la securite de l'application

### 3. Deploiement (`deployment.yml`)
- Deploie l'application sur Render
- Se declenche uniquement sur la branche main
- Inclut la verification de sante post-deploiement

## Depannage

### Problemes Courants

1. **Echecs de Build** :
   - Verifiez la compatibilite de la version Node.js
   - Verifiez que toutes les dependances sont listees dans package.json
   - Consultez les logs de build dans le tableau de bord Render

2. **Variables d'Environnement** :
   - Assurez-vous que toutes les variables requises sont definies
   - Verifiez les fautes de frappe dans les noms de variables
   - Verifiez le format de la chaine de connexion MongoDB

3. **Echecs de Verification de Sante** :
   - Verifiez que l'endpoint `/api/health` est accessible
   - Verifiez si le service est completement demarre
   - Consultez les logs de l'application

4. **Problemes CORS** :
   - Mettez a jour la configuration CORS dans le backend
   - Assurez-vous que l'URL du frontend est autorisee
   - Verifiez les URLs specifiques a l'environnement

### Commandes de Debug

```bash
# Tester l'endpoint de sante localement
curl http://localhost:8000/api/health

# Verifier la connexion MongoDB
node -e "require('mongoose').connect('votre-uri-mongo').then(() => console.log('Connecte')).catch(console.error)"

# Verifier les variables d'environnement
echo $NODE_ENV
```

## Deploiement Manuel

Si le deploiement automatique echoue, vous pouvez le declencher manuellement :

```bash
# Declencher le deploiement via webhook
curl -X POST "VOTRE_RENDER_DEPLOY_HOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"ref": "main", "message": "Deploiement manuel"}'
```

## Surveillance

### Surveillance de Sante
- Endpoint de sante : `/api/health`
- Retourne le statut du service, timestamp, environnement, version

### Logs
- Logs GitHub Actions : Repository > onglet Actions
- Logs Render : Tableau de bord du service > onglet Logs
- Logs de l'application : Verifiez les instructions console.log

## Considerations de Securite

1. **Gestion des Secrets** :
   - Ne jamais committer les secrets dans le repository
   - Utiliser GitHub Secrets pour les donnees sensibles
   - Faire la rotation des secrets regulierement

2. **Securite de la Base de Donnees** :
   - Utiliser des mots de passe forts
   - Limiter l'acces a la base de donnees par IP
   - Activer l'authentification de la base de donnees

3. **Securite de l'API** :
   - Implementer la limitation de taux
   - Utiliser HTTPS uniquement
   - Valider toutes les entrees

## Optimisation des Performances

1. **Optimisation du Build** :
   - Utiliser npm ci au lieu de npm install en production
   - Activer la mise en cache du build
   - Minimiser la taille des bundles

2. **Optimisation de la Base de Donnees** :
   - Utiliser les index de base de donnees
   - Implementer le pooling de connexions
   - Surveiller les performances des requetes

3. **Surveillance** :
   - Configurer la surveillance de disponibilite
   - Surveiller les temps de reponse
   - Suivre les taux d'erreur
