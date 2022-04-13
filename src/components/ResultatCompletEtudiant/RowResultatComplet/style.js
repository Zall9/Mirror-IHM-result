import { makeStyles } from '@mui/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default useRowStyles;
