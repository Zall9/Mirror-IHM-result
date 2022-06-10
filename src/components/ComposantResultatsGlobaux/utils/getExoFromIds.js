export const getExoFromIds = (idEtu, idExo, ListeExo) => {
  let res = ListeExo.find((exo) => exo.idEtu == idEtu && exo.idExo == idExo);
  if (res !== undefined && res !== null) {
    return res;
  }
  return -1;
};
