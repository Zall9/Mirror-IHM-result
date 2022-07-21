import { io } from 'socket.io-client';
import { addExercice, addAttempt, addSupportRequest } from '@stores/Exercices/exercicesSlice';

export const initSocketConnection = (dispatch, sessions) => {
  const socket = io(import.meta.env.VITE_SRVRESULT_URL, {
    path: import.meta.env.VITE_SRVRESULT_SOCKETIO_SUBFOLDER,
  });

  socket.on('exercices', ({ etudiantCommenceExo }) => {
    console.info('socket:Etudiant Commence', etudiantCommenceExo);
    dispatch(addExercice(etudiantCommenceExo));
  });

  socket.on('tentatives', ({ etudiantFaitNouvelleTentative }) => {
    console.info('socket:Etudiant Fait une nouvelle tentative', etudiantFaitNouvelleTentative);
    dispatch(addAttempt(etudiantFaitNouvelleTentative));
  });

  socket.on('aides', ({ etudiantDemandeAide }) => {
    dispatch(addSupportRequest(etudiantDemandeAide));
  });
};
