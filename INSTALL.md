# Installation

1. Installaler les dépendances de developpement

```bash
npm install
```

2. Build le projet

```bash
npm run build
```

3. Servez le code du dossier `build` statiquement (avec apache, nginx, etc.)

## Avec Docker

Vous pouver utiliser Docker pour l'IHM, mais vous devez build vous même en ayant un `.env` dans votre dossier courrant : lors de build du conteneur, on doit connaitre les variables d'environnement pour les URL des APIs.

Le fichier `docker-compose.yaml` est là à titre d'exemple.
