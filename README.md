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

![Alt Text](https://manouchian.univ-smb.fr/smartlab/projetsl3-2021/latools/ihmresult/-/issues/31/designs/Peek_25-07-2022_12-16.gif)

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
