import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '@stores/Exercises/exercisesSlice';
import sessionReducer from '@stores/Sessions/sessionSlice';
import authReducer from '@stores/Auth/authSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    sessions: sessionReducer,
    auth: authReducer,
  },
});
