import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addExercice } from '@stores/Exercices/exercicesSlice';

export const initSocketConnection = () => {
  const dispatch = useDispatch();
  const socket = io(process.env.REACT_APP_SRVRESULT_URL);
  socket.on('exercices', (exercices) => {
    console.log('GETTING EXERCICES');
    console.log(exercices);
    dispatch(addExercice(exercices));
  });
};
