import React from 'react';
import { getAuth } from '@stores/Auth/authSlice';
import { Navigate, Outlet, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// https://stackoverflow.com/a/71577993
const AuthLayout = ({ redirect }) => {
  const auth = useSelector(getAuth);

  const enabled = import.meta.env.VITE_OAUTH_ENABLED === 'true';

  if (!enabled) return <Outlet />;
  if (auth.isAuthenticated) return <Outlet />;

  return <Navigate to={redirect} replace />;
};

// Extend props from component Route
AuthLayout.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default AuthLayout;
