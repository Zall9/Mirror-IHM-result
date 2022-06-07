import React from 'react';
import { useSelector } from 'react-redux';
import { getConnectUrl } from '@services/userprofile/userprofile';
import { Navigate } from 'react-router-dom';
import { Typography, Link } from '@mui/material';
import { getAuth } from '@stores/Auth/authSlice';

const Login = () => {
  const auth = useSelector(getAuth);

  if (process.env.REACT_APP_OAUTH_ENABLED !== 'true' || auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const url = getConnectUrl();

  return (
    <Typography>
      Veuillez vous connecter <Link href={url}>ici</Link> si vous n&apos;êtes pas directement
      redirigé
    </Typography>
  );
};

export default Login;
