import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const LoginCallback = () => {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const querystring = new URLSearchParams();

  const accessToken = querystring.get('access_token');

  if (process.env.REACT_APP_OAUTH_ENABLED !== 'true' || auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (token) {
    dispatch(setToken(accessToken));
    dispatch(setAuthenticated(true));
    return <Navigate to="/" />;
  } else {
    return <Typography>Authentification échouée</Typography>;
  }
};

export default LoginCallback;
