// src/hooks/useAuth.ts
import { PylonSDK } from '@/pylon-sdk';
import { useCallback, useState } from 'react';

export function useAuth(sdk: PylonSDK) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateFarcasterJWT = useCallback(async (data: Parameters<typeof sdk.auth.generateFarcasterJWT>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.generateFarcasterJWT(data);
      
      if (response.data.message === 'success') {
        // The cookie is set by the server, no need to manually set it here
        //window.location.reload();
      }
      console.log('cookie response', response.cookies);
      console.log('response', response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const deleteFarcasterJWT = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.deleteFarcasterJWT();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const generateChallenge = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.generateChallenge();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const registerPasskey = useCallback(async (data: Parameters<typeof sdk.auth.registerPasskey>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.registerPasskey(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const authenticatePasskey = useCallback(async (data: Parameters<typeof sdk.auth.authenticatePasskey>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.authenticatePasskey(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const initiatePasskeyRegistration = useCallback(async (data: Parameters<typeof sdk.auth.initiatePasskeyRegistration>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.initiatePasskeyRegistration(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const issueOTP = useCallback(async (data: Parameters<typeof sdk.auth.issueOTP>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.issueOTP(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const verifyOTP = useCallback(async (data: Parameters<typeof sdk.auth.verifyOTP>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.verifyOTP(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  return {
    generateChallenge,
    registerPasskey,
    authenticatePasskey,
    initiatePasskeyRegistration,
    issueOTP,
    verifyOTP,
    generateFarcasterJWT,
    deleteFarcasterJWT,
    isLoading,
    error,
  };
}