import axios from 'axios';

// Le serveur répond 302, donc le front redirige automatiquement vers la page de connexion
// Sinon, il renvoie l'url vers la page de connexion
export async function redirectToUserprofileLogin() {
  console.log('Querying connect url from ' + import.meta.env.VITE_SRVRESULT_URL + '/oauth');
  const res = await axios.get(import.meta.env.VITE_SRVRESULT_URL + '/oauth');
  if (res.data.url) {
    window.location.replace(res.data.url);
  }
}
