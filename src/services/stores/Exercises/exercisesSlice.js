import { createSlice } from '@reduxjs/toolkit';

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: {},
  },
  reducers: {
    setExercises: (state, respExercises) => {
      respExercises.payload.forEach((exercise) => {
        state.exercises[exercise.id] = exercise;
      });
    },
    addExercise: (state, respExercise) => {
      state.exercises[respExercise.payload.id] = respExercise.payload;
    },
    addAttempt: (state, respAttempt) => {
      let exercice = state.exercises[respAttempt.payload.idExoEtu];
      // delete infos en double
      if (exercice) {
        exercice.tentatives.push(respAttempt.payload);
        if (respAttempt.payload.validationExercice) {
          exercice.estFini = true;
        }
      } else {
        throw Error('Exercice not found for Tentative!');
      }
    },
    addSupportRequest: (state, respSupportRequest) => {
      let exercice = state.exercises[respSupportRequest.payload.idExoEtu];
      console.info('addSupportRequest !', exercice);
      console.info('Payload addSupportRequest', respSupportRequest.payload);
      if (exercice) {
        exercice.aides.push(respSupportRequest.payload);
        if (respSupportRequest.payload.resolue) {
          exercice.aides.find((aide) => aide.id === respSupportRequest.payload.id).resolue = true;
        }
      } else {
        throw Error('Exercice not found for HelpRequest!');
      }
    },
  },
});

//A besoin d'être en dehors du Slice pour pouvoir return le state
export const getExercises = (state) => {
  return state.exercises.exercises;
};

// Action creators are generated for each case reducer function
export const { setExercises, addExercise, addAttempt, addSupportRequest } = exercisesSlice.actions;

export default exercisesSlice.reducer;
