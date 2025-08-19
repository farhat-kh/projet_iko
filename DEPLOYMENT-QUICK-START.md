# Guide de Deploiement Rapide

## Prerequis

1. Repository GitHub avec le code du projet
2. Compte Render.com
3. Compte MongoDB Atlas (recommande)

## Etape 1: Configuration des Secrets GitHub

Allez dans votre repository GitHub > Settings > Secrets and variables > Actions

Ajoutez ces secrets :

```
RENDER_DEPLOY_HOOK_URL=https://api.render.com/deploy/srv-xxxxx?key=yyyyy
RENDER_SERVICE_URL=https://votre-app.onrender.com
```

## Etape 2: Configuration MongoDB Atlas

1. Creez un compte MongoDB Atlas
2. Creez un nouveau cluster
3. Creez un utilisateur de base de donnees
4. Autorisez les adresses IP (0.0.0.0/0 pour simplifier)
5. Recuperez la chaine de connexion

## Etape 3: Creation des Services Render

### Service Backend
1. Nouveau Web Service
2. Connectez votre repository GitHub
3. Configuration :
   - Commande de build : `cd backend && npm install`
   - Commande de demarrage : `cd backend && npm start`
   - Variables d'environnement :
     ```
     NODE_ENV=production
     PORT=10000
     MONGO_URI=mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/nombase
     TOKEN=votre-secret-jwt-32-caracteres
     DB_NAME=ikomeubles
     EMAIL_USER=votre-email@gmail.com
     EMAIL_PASS=votre-mot-de-passe-app-gmail
     ```

### Service Frontend
1. Nouveau Static Site
2. Meme repository GitHub
3. Configuration :
   - Commande de build : `cd frontend && npm install && npm run build`
   - Repertoire de publication : `frontend/dist`
   - Variables d'environnement :
     ```
     VITE_API_URL=https://votre-backend.onrender.com/api
     VITE_NODE_ENV=production
     ```

## Etape 4: Recuperation de l'URL de Deploiement

1. Allez dans service backend > Settings
2. Trouvez la section "Deploy Hook"
3. Copiez l'URL du webhook
4. Ajoutez-la aux secrets GitHub comme `RENDER_DEPLOY_HOOK_URL`

## Etape 5: Test du Deploiement

1. Poussez le code sur la branche main
2. Verifiez l'onglet GitHub Actions pour le statut du pipeline
3. Verifiez que les services fonctionnent sur Render
4. Testez les fonctionnalites de l'application

## Depannage

### Echec du Build
- Verifiez les logs Render
- Assurez-vous que toutes les variables d'environnement sont definies
- Verifiez que la chaine de connexion MongoDB est correcte

### Echec du Health Check
- Verifiez que l'endpoint `/api/health` fonctionne
- Verifiez si le service backend est completement demarre
- Consultez les logs de l'application

### Problemes CORS
- Mettez a jour la configuration CORS dans le backend
- Assurez-vous que l'URL du frontend est autorisee

## Deploiement Manuel

Si le deploiement automatique echoue :

```bash
curl -X POST "VOTRE_RENDER_DEPLOY_HOOK_URL"
```

## Surveillance

- Endpoint de sante : `https://votre-backend.onrender.com/api/health`
- GitHub Actions : Repository > onglet Actions
- Logs Render : Tableau de bord du service > Logs

## Support

Pour des instructions detaillees, consultez `docs/CICD-SETUP.md`
