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

export const calculateTime = (date1, date2) => {
  const DATE1 = _dateToTimestamp(date1);
  const DATE2 = _dateToTimestamp(date2);
  const diff = ~~((DATE2 - DATE1) / 1000);
  const minute = ~~(diff / 60);
  const second = diff % 60;
  return minute + 'm' + (second < 10 ? '0' : '') + second + 's';
};
const _dateToTimestamp = (date) => {
  return new Date(date).getTime();
};
