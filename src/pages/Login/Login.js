import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Typography, Link } from '@mui/material';
import { getAuth } from '@stores/Auth/authSlice';
import { redirectToUserprofileLogin } from '../../services/userprofile/userprofile';

const Login = async () => {
  const auth = useSelector(getAuth);

  if (process.env.REACT_APP_OAUTH_ENABLED !== 'true' || auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  await redirectToUserprofileLogin();

  return (
    <Typography>Vous n&apos;avez pas été redirigé, notre navigateur est-il trop vieux ?</Typography>
  );
};

export default Login;
