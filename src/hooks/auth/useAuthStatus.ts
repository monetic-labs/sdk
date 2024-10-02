import { useState, useEffect } from 'react';
import { usePylon } from '@/PylonContext';

export const useAuthStatus = () => {
  const pylonInstance = usePylon();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = { data: true }; // TODO: poll local storage for auth status
      setIsAuthenticated(response.data);
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 60_000); // Check every minute
    return () => clearInterval(interval);
  }, [pylonInstance]);

  return { isAuthenticated, checkAuthStatus };
};
