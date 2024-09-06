import { useState, useEffect } from 'react';
import Pylon from '@/api/Pylon';

export const useAuthStatus = (pylonInstance: Pylon) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await pylonInstance.checkAuthStatus();
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
  }, []);

  return { isAuthenticated, checkAuthStatus };
};
