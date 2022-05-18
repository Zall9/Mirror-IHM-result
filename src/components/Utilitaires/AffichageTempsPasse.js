const timeToString = (time) =>
  time / 1000 < 60
    ? Math.floor(time / 1000) + ' s'
    : time / 60000 < 60
    ? Math.floor(time / 60000) + ' m'
    : time / 3600000 < 24
    ? Math.floor(time / 3600000) + ' h'
    : Math.floor(time / 86400000) + ' j';

export default timeToString;
