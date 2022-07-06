/**
 * prend une date comme paramètre, la convertit en chaîne, la divise en un tableau, divise le
 * deuxième élément du tableau en un autre tableau, puis renvoie le premier élément du deuxième tableau
 * avec un 'h' entre les deux et le deuxième élément du deuxième tableau
 * @param date - la date que vous voulez analyser
 * @returns La date est renvoyée dans un format différent.
 */
export const dateParser = (date) => {
  let newDate = new Date(date).toLocaleDateString('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
  });
  let newDateArray = newDate.split(' ');
  let newDateArray2 = newDateArray[1].split(':');
  let newDateArray3 = newDateArray2[0] + 'h' + newDateArray2[1];
  return newDateArray3;
};

/**
 * prend deux dates et renvoie la différence entre elles en minutes et secondes
 * @param date1 - La date de début
 * @param date2 - La date actuelle
 * @returns Une chaîne qui représente la différence de temps entre deux dates.
 */
export const calculateTime = (date1, date2) => {
  const DATE1 = _dateToTimestamp(date1);
  const DATE2 = _dateToTimestamp(date2);
  const diff = ~~((DATE2 - DATE1) / 1000);
  const minute = ~~(diff / 60);
  const second = diff % 60;
  return minute + 'm' + (second < 10 ? '0' : '') + second + 's';
};
/**
 * Convertir une date en timestamp.
 * @param date - Date à convertir en horodatage.
 * @returns l'horodatage de la date transmise.
 */
const _dateToTimestamp = (date) => {
  return new Date(date).getTime();
};
