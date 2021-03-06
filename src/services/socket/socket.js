import { io } from 'socket.io-client';
import { addExercice, addTentative, addAide } from '@stores/Exercices/exercicesSlice';

export const initSocketConnection = (dispatch, sessions) => {
  const socket = io(process.env.REACT_APP_SRVRESULT_URL, {
    path: process.env.REACT_APP_SRVRESULT_SOCKETIO_SUBFOLDER,
  });

  socket.on('exercices', ({ etudiantCommenceExo }) => {
    console.log('socket:Etudiant Commence', etudiantCommenceExo);
    dispatch(addExercice(etudiantCommenceExo));
  });

  socket.on('tentatives', ({ etudiantFaitNouvelleTentative }) => {
    console.log('socket:Etudiant Fait une nouvelle tentative', etudiantFaitNouvelleTentative);
    dispatch(addTentative(etudiantFaitNouvelleTentative));
  });

  socket.on('aides', ({ etudiantDemandeAide }) => {
    dispatch(addAide(etudiantDemandeAide));
  });
};
