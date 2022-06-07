import { configureStore } from '@reduxjs/toolkit';
import exercicesReducer from '@stores/Exercices/exercicesSlice';
import sessionReducer from '@stores/Sessions/sessionSlice';
import authReducer from '@stores/Auth/authSlice';

export default configureStore({
  reducer: {
    exercices: exercicesReducer,
    sessions: sessionReducer,
    auth: authReducer,
  },
});
