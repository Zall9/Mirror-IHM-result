import { io } from 'socket.io-client';
import { addExercice, addTentative } from '@stores/Exercices/exercicesSlice';
import { addSession } from '@stores/Sessions/sessionSlice';
import axios from 'axios';

export const initSocketConnection = (dispatch, sessions) => {
  const socket = io(process.env.REACT_APP_SRVRESULT_URL);

  socket.on('exercices', ({ etudiantCommenceExo }) => {
    console.log(etudiantCommenceExo);
    dispatch(addExercice(etudiantCommenceExo));
    var sessionExist = sessions.find((session) => session.id === etudiantCommenceExo.idSession);
    if (!sessionExist) {
      axios
        .get(process.env.REACT_APP_SRVEXO_URL + '/sessions/' + etudiantCommenceExo.idSession)
        .then((res) => {
          dispatch(addSession(res.data.session));
        });
    }
  });

  socket.on('tentatives', ({ etudiantFaitNouvelleTentative }) => {
    console.log(etudiantFaitNouvelleTentative);
    dispatch(addTentative(etudiantFaitNouvelleTentative));
  });
};
