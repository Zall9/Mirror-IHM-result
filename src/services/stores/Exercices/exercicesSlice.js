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
    addTentative: (state, respTentative) => {
      if (state.data.length > 0) {
        // todo: a terme, il faudra aussi tester si c'est le bon idSession
        let exercice = state.data.find(
          (exo) =>
            exo.idExo === respTentative.payload.idExo && exo.idEtu === respTentative.payload.idEtu,
        );
        // delete infos en double
        if (exercice) {
          delete respTentative.payload.idEtu;
          delete respTentative.payload.idExo;
          delete respTentative.payload.idSession;
          exercice.tentatives.push(respTentative.payload);
        } else {
          throw Error('Exercice not found');
        }
      }
    },
  },
});

export const getExercices = (state) => state.exercices.data;
// Action creators are generated for each case reducer function
export const { setExercices, addExercice, addTentative } = exercicesSlice.actions;

export default exercicesSlice.reducer;
