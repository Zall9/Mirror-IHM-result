import { configureStore } from '@reduxjs/toolkit';
import exercicesReducer from '@stores/Exercices/exercicesSlice';

export default configureStore({
  reducer: {
    exercices: exercicesReducer,
  },
});
