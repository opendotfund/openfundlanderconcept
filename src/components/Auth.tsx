
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../pages/Auth';

// This is a simple wrapper around the Auth page to be used as a component
const AuthComponent = () => {
  return <Auth />;
};

export default AuthComponent;
