import axios from 'axios';

// Le serveur répond 302, donc le front redirige automatiquement vers la page de connexion
// Sinon, il renvoie l'url vers la page de connexion
export async function redirectToUserprofileLogin() {
  console.log('Querying connect url from ' + process.env.REACT_APP_SRVRESULT_URL + '/oauth');
  axios
    .get(process.env.REACT_APP_SRVRESULT_URL + '/oauth')
    .then((res) => {
      console.log('Response from server ', res);
    })
    .catch((err) => {
      console.log('Error from server ', err);
    });
}
