// src/hooks/useBridge.ts
import { useCallback, useState } from 'react';
import { PylonSDK } from '../index';
import { BridgeSchemaType } from '../schemas/bridge';

export function useBridge(sdk: PylonSDK) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPrefundedAccountBalance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.bridge.getPrefundedAccountBalance();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const createPrefundedAccountTransfer = useCallback(async (data: BridgeSchemaType['createPrefundedAccountTransfer']['body']) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.bridge.createPrefundedAccountTransfer(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const processWebhook = useCallback(async (data: BridgeSchemaType['processWebhook']['body']) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.bridge.processWebhook(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  return {
    getPrefundedAccountBalance,
    createPrefundedAccountTransfer,
    processWebhook,
    isLoading,
    error,
  };
}