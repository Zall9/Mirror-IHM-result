import { io } from 'socket.io-client';
import { addExercice } from '@stores/Exercices/exercicesSlice';

export const initSocketConnection = (dispatch) => {
  const socket = io(process.env.REACT_APP_SRVRESULT_URL);
  socket.on('exercices', ({ etudiantCommenceExo }) => {
    console.log(etudiantCommenceExo);
    dispatch(addExercice(etudiantCommenceExo));
  });
};
