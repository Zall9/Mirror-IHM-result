function compteNbExoValides(listeExo) {
  let compteur = 0;
  listeExo.map((exo) => {
    if (exo.estFini) {
      compteur++;
    }
  });
  return compteur;
}
export default compteNbExoValides;
