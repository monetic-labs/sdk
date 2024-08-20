// src/hooks/useTransaction.ts
import { useCallback, useState } from 'react';
import { PylonSDK } from '../index';
import { TransactionProcessInput, TransactionProcessOutput } from '../schemas/transaction';

export function useTransaction(sdk: PylonSDK) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processTransaction = useCallback(async (data: TransactionProcessInput): Promise<TransactionProcessOutput> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.transaction.processTransaction(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while processing the transaction'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const getTransactionStatus = useCallback(async (transactionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.transaction.getTransactionStatus(transactionId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching transaction status'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  // You can add more transaction-related methods here as needed

  return {
    processTransaction,
    getTransactionStatus,
    isLoading,
    error,
  };
}