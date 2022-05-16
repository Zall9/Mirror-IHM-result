import { makeStyles } from '@mui/styles';

const useCarteStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
      fontSize: '16px',
    },
  },
});

export default useCarteStyles;
