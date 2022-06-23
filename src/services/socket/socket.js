import { io } from 'socket.io-client';
import { addExercice, addTentative } from '@stores/Exercices/exercicesSlice';
import { addSession } from '@stores/Sessions/sessionSlice';
import axios from 'axios';

export const initSocketConnection = (dispatch) => {
  const socket = io(process.env.REACT_APP_SRVRESULT_URL);
  // const socket = io('localhost:3011');
  socket.on('exercices', ({ etudiantCommenceExo }) => {
    console.log('socket:Etudiant Commence', etudiantCommenceExo);
    dispatch(addExercice(etudiantCommenceExo));
    // var sessionExist = sessions.find((session) => session.id === etudiantCommenceExo.idSession);
    // if (!sessionExist) {
    //   axios
    //     .get(process.env.REACT_APP_SRVEXO_URL + '/sessions/' + etudiantCommenceExo.idSession)
    //     .then((res) => {
    //       dispatch(addSession(res.data.session));
    //     });
    // }
  });

  socket.on('tentatives', ({ etudiantFaitNouvelleTentative }) => {
    console.log('socket:Etudiant Fait une nouvelle tentative', etudiantFaitNouvelleTentative);
    dispatch(addTentative(etudiantFaitNouvelleTentative));
  });

  socket.on('aides', ({ etudiantDemandeAide }) => {
    dispatch(addAide(etudiantDemandeAide));
  });
};
