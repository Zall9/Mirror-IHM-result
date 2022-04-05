import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '@stores/Exercices/dataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});
