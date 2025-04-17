
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Auth from '../pages/Auth';

// This is a simple wrapper around the Auth page to be used as a component
const AuthComponent = () => {
  const { session } = useAuth();
  
  // Redirect to /account if user is already logged in
  if (session) {
    return <Navigate to="/account" replace />;
  }

  return <Auth />;
};

export default AuthComponent;
