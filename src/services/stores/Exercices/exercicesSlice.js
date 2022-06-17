import { createSlice } from '@reduxjs/toolkit';

export const exercicesSlice = createSlice({
  name: 'exercices',
  initialState: {
    exercices: {},
  },
  reducers: {
    setExercices: (state, respExercices) => {
      respExercices.payload.forEach((exercice) => {
        state.exercices[exercice.id] = exercice;
      });
    },
    addExercice: (state, respExercice) => {
      state.exercices[respExercice.payload.id] = respExercice.payload;
    },
    addTentative: (state, respTentative) => {
      let exercice = state.exercices[respTentative.payload.id];
      // delete infos en double
      if (exercice) {
        exercice.tentatives.push(respTentative.payload);
        if (respTentative.payload.validationExercice) {
          exercice.estFini = true;
        }
      } else {
        throw Error('Exercice not found');
      }
    },
    addAide: (state, respAide) => {
      if (state.exercices.length > 0) {
        let exercice = state.exercices[respAide.payload.idExo];

        if (exercice) {
          // Si l'aide existe déjà, on la met à jour
          let exist = false;
          exercice.aides = exercice.aides.map((aide) => {
            if (aide.id == respAide.payload.id) {
              exist = true;
              return respAide.payload;
            } else {
              return aide;
            }
          });
          if (!exist) exercice.aides.push(respAide.payload);
        } else {
          throw Error('Exercice not found');
        }
      }
    },
  },
});

export const getExercices = (state) => {
  return state.exercices.exercices;
};
// Action creators are generated for each case reducer function
export const { setExercices, addExercice, addTentative, addAide } = exercicesSlice.actions;

export default exercicesSlice.reducer;
