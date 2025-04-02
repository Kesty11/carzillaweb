import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthListener() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // When user signs in and we're on an auth page (signin/signup), redirect to home
    if (currentUser) {
      const isAuthPage = 
        location.pathname === '/signin' || 
        location.pathname === '/signup';
      
      if (isAuthPage) {
        navigate('/');
      }
    }
  }, [currentUser, navigate, location]);

  // This component doesn't render anything
  return null;
} 