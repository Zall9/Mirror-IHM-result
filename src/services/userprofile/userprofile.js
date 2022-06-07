import axios from 'axios';

export async function getConnectUrl() {
  const res = await axios.get(process.env.REACT_APP_SRVRESULT_URL + '/oauth');
  const url = res.data.url;
  return typeof url === 'string' ? url : undefined;
}
