import { configureStore } from '@reduxjs/toolkit';
import exercicesReducer from '@stores/Exercices/exercicesSlice';
/* Création d'une tranche du magasin Redux. */
import sessionReducer from '@stores/Session/sessionSlice';
export default configureStore({
  reducer: {
    exercices: exercicesReducer,
    sessions: sessionReducer,
  },
});
