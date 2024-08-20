// src/hooks/useWorldpay.ts
import { useCallback, useState } from 'react';
import { PylonSDK } from '../index';
import { WorldpaySchemaType } from '../schemas/worldpay';

export function useWorldpay(sdk: PylonSDK) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const authorizePayment = useCallback(async (data: WorldpaySchemaType['authorizePayment']['request']) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.worldpay.authorizePayment(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during payment authorization'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const queryPaymentStatus = useCallback(async (transactionReference: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.worldpay.queryPaymentStatus(transactionReference);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while querying payment status'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const performRiskAssessment = useCallback(async (data: WorldpaySchemaType['riskAssessment']['request']) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.worldpay.performRiskAssessment(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during risk assessment'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const createVerifiedToken = useCallback(async (data: WorldpaySchemaType['verifiedToken']['request']) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sdk.worldpay.createVerifiedToken(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while creating a verified token'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  return {
    authorizePayment,
    queryPaymentStatus,
    performRiskAssessment,
    createVerifiedToken,
    isLoading,
    error,
  };
}