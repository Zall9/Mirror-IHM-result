import { createSlice } from '@reduxjs/toolkit';

export const exercicesSlice = createSlice({
  name: 'exercices',
  initialState: {
    data: [],
  },
  reducers: {
    setExercices: (state, respExercices) => {
      state.data = respExercices.payload;
    },
    addExercice: (state, respExercice) => {
      state.data.push(respExercice.payload);
    },
  },
});

export const selectData = (state) => state.exercices.data;
// Action creators are generated for each case reducer function
export const { setExercices, addExercice } = exercicesSlice.actions;

export default exercicesSlice.reducer;
