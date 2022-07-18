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
      let exercice = state.exercices[respTentative.payload.idExoEtu];
      // delete infos en double
      if (exercice) {
        exercice.tentatives.push(respTentative.payload);
        if (respTentative.payload.validationExercice) {
          exercice.estFini = true;
        }
      } else {
        throw Error('Exercice not found for Tentative!');
      }
    },
    addAide: (state, respAide) => {
      let exercice = state.exercices[respAide.payload.idExoEtu];
      console.log('AddAide !', exercice);
      console.log('Payload AddAide', respAide.payload);
      if (exercice) {
        exercice.aides.push(respAide.payload);
        if (respAide.payload.resolue) {
          exercice.aides.find((aide) => aide.id === respAide.payload.id).resolue = true;
        }
      } else {
        throw Error('Exercice not found for HelpRequest!');
      }
    },
  },
});

//A besoin d'être en dehors du Slice pour pouvoir return le state
export const getExercices = (state) => {
  return state.exercices.exercices;
};

// Action creators are generated for each case reducer function
export const { setExercices, addExercice, addTentative, addAide } = exercicesSlice.actions;

export default exercicesSlice.reducer;
