/* Constante qui représente le contenu statique de index.jsx
 * pour implémenter l'internationalisation
 * il suffit d'ajouter un contexte dans app qui stocke le language de l'utilisateur
 *
 * Creer une fonction qui prend en paramètre le language de l'utilisateur et renvoie la clé
 *    qui correspond au contenu souhaité dans LANGUAGES_CONTENT
 *
 * Dispatch le résultat de la fonction dans le contexte
 * Modifier dans index.jsx le header pour afficher le contenu du language de l'utilisateur (frFR en dur actuellement)
 */
export const LANGUAGES_CONTENT = {
  frFR: {
    gridContent: {
      columnHeaders: {
        studentCol: {
          headerName: 'id étudiant',
        },
      },
      contentSelector: {
        filters: ['en cours', 'finis', 'tous', 'aides'],
      },
    },
  },
};
