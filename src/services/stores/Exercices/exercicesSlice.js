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
        let exercice = state.data.find(
          (exo) =>
            exo.idExo === respTentative.payload.idExo &&
            exo.idEtu === respTentative.payload.idEtu &&
            exo.idSession === respTentative.payload.idSession,
        );

        // delete infos en double
        if (exercice) {
          delete respTentative.payload.idEtu;
          delete respTentative.payload.idExo;
          delete respTentative.payload.idSession;
          exercice.tentatives.push(respTentative.payload);
          if (respTentative.payload.validationExercice) {
            exercice.estFini = true;
          }
        } else {
          throw Error('Exercice not found');
        }
      }
    },
    addAide: (state, respAide) => {
      let exercice = state.data.find(
        (exo) =>
          exo.idExo === respAide.payload.idExo &&
          exo.idEtu === respAide.payload.idEtu &&
          exo.idSession === respAide.payload.idSession,
      );

      if (exercice) {
        delete respAide.payload.idEtu;
        delete respAide.payload.idExo;
        delete respAide.payload.idSession;
        delete respAide.payload.idSeance;

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
      }
    },
  },
});

export const getExercices = (state) => state.exercices.data;
// Action creators are generated for each case reducer function
export const { setExercices, addExercice, addTentative, addAide } = exercicesSlice.actions;

export default exercicesSlice.reducer;
