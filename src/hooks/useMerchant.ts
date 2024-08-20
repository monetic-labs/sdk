// src/hooks/useMerchant.ts
import { useCallback, useState } from 'react';
import { PylonSDK } from '../index';
import { MerchantCreateInput, MerchantCreateOutput, TransferStatusInput, TransferStatusOutput } from '../schemas/merchant';

export function useMerchant(sdk: PylonSDK) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMerchant = useCallback(async (data: MerchantCreateInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.merchant.createMerchant(data);
      return response as MerchantCreateOutput;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const getTransferStatus = useCallback(async (data: TransferStatusInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.merchant.getTransferStatus({ transferId: data.transferId });
      return response as TransferStatusOutput;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  return {
    createMerchant,
    getTransferStatus,
    isLoading,
    error,
  };
}