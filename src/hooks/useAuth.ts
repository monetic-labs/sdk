import { useState, useEffect } from 'react';
import Pylon from '../api/Pylon';

export function useAuth(pylonInstance: Pylon) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await pylonInstance.generateAccessToken();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pylonInstance]);

  return { data, loading, error };
}
