import { makeStyles } from '@mui/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
      fontSize: '16px',
    },
  },
});

export default useRowStyles;
