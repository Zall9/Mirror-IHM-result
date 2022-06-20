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
