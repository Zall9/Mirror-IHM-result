import { Button } from '@mui/material';
import React from 'react';
import axios from 'axios';

/**
 * Callback: Télécharge les données dans un fichier json
 */
function downloadObjectAsJson() {
  axios.get('http://localhost:3002/exercices').then(
    (res) => {
      const data = res.data.exercices;
      const dataStr = JSON.stringify(data);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'exercices.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log('done');
    },
  );
}
const BoutonExport = () => {
  return (
    <Button onClick={downloadObjectAsJson} variant="contained" color="primary">
      Exporter les resultats
    </Button>
  );
};

export default BoutonExport;
