import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    exercices: [],
  },
  reducers: {
    setData: (state, data) => {
      state.exercices = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
