import axios from 'axios';

// Le serveur répond 302, donc le front redirige automatiquement vers la page de connexion
// Sinon, il renvoie l'url vers la page de connexion
export async function redirectToUserprofileLogin() {
  console.info('Querying connect url from ' + process.env.REACT_APP_SRVRESULT_URL + '/oauth');
  const res = await axios.get(process.env.REACT_APP_SRVRESULT_URL + '/oauth');
  if (res.data.url) {
    window.location.replace(res.data.url);
  }
}
