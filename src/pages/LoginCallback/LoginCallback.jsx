import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getAuth } from '@stores/Auth/authSlice';
import { Typography } from '@mui/material';
import { setToken, setAuthenticated } from '@stores/Auth/authSlice';

const LoginCallback = () => {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  const [searchParams, _] = useSearchParams();
  const accessToken = searchParams.get('access_token');

  if (import.meta.env.VITE_OAUTH_ENABLED !== 'true' || auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (accessToken) {
    dispatch(setToken(accessToken));
    dispatch(setAuthenticated(true));
    return <Navigate to="/" />;
  } else {
    return <Typography>Authentification échouée</Typography>;
  }
};

export default LoginCallback;
