# IHM des résultats étudiants

Pour installer l'IHM, référez-vous à INSTALL.md

## Architecture

Les composants de l'IHM sont définis dans le fichier `src/components/ComposantResultatsGlobaux`.
Le fichier index.jsx contient le code de l'IHM.

Le dossier `services` contient l'implémentation de la connection WS, l'userProfile ainsi que le store Redux.
Le store est alimenté par les soumissions des étudiants reçues en websocket.

internationalization.js est un fichier exportant un objet qui contient les données statiques d'index.js.

Les dossiers préfixé `LEGACY-` sont les dossiers contenant le travail ayant été utilisé pour la version de l'IHM réalisée par l'équipe de projet.
Les architectures du store & des bases de données ont changés au cours du stage.
Les composants ne sont plus fonctionnels.
Ces composants n'avaient pas été testés au cours de leurs dévelopement avec beaucoup de données. Il est donc possible que certains problèmes de performances soient présents.

## Indicateurs

L'interface se présente sous la forme d'un tableau de résultats.
Chaque ligne représente un étudiant.
Chaque colonne représente un exercice.
L'enseignant peut choisir quelles colonnes cacher/afficher en cliquant sur le boutton COLONNES.
Il peut selectionner sa session & séance.
Un export de la grille au format JSON,CSV ou PDF est possible via le boutton EXPORT.

Le bouton FILTRE permet de filtrer les résultats.
Il est possible d'afficher les aides en cliquant sur la main.
![Alt Text](https://cdn.discordapp.com/attachments/924613729881059389/1001072830231883776/Peek_25-07-2022_12-25.gif)

Les cellules de la grille sont colorées en fonction du nombre de tentatives que l'étudiant a fait sur l'exercice courant.
Le jeu de couleur pour la coloration de la cellule dépend de si l'étudiant est après le temps moyen ou non. (Couleur allant du vert au jaune pour les étudiants avant le temps moyen, jaune à rouge pour les étudiants après le temps moyen)

Lorsque l'on clique sur une cellule, une popup s'affiche avec les informations de l'étudiant pour cet exercice.
La popup contient les informations suivantes :

- Nom de l'étudiant
- Nom de l'exercice
- L'énoncé de l'exercice
- Une frise chronologique des soumissions/demandes d'aides par rapport au temps moyen
  la frise chronologique est cliquable et affiche le code de la tentative cliquée.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3003) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Build and serve the app from the `build` folder.
