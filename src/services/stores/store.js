import { configureStore } from '@reduxjs/toolkit';
import exercicesReducer from '@stores/Exercices/exercicesSlice';
import sessionReducer from '@stores/Sessions/sessionSlice';

export default configureStore({
  reducer: {
    exercices: exercicesReducer,
    sessions: sessionReducer,
  },
});
