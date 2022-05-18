import { io } from 'socket.io-client';
import { addExercice, addTentative, addAide } from '@stores/Exercices/exercicesSlice';

export const initSocketConnection = (dispatch) => {
  const socket = io(process.env.REACT_APP_SRVRESULT_URL);

  socket.on('exercices', ({ etudiantCommenceExo }) => {
    dispatch(addExercice(etudiantCommenceExo));
  });

  socket.on('tentatives', ({ etudiantFaitNouvelleTentative }) => {
    dispatch(addTentative(etudiantFaitNouvelleTentative));
  });

  socket.on('aides', ({ etudiantDemandeAide }) => {
    console.log(etudiantDemandeAide);
    dispatch(addAide(etudiantDemandeAide));
  });
};
