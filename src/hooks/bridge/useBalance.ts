'use client';

import { useEffect, useState, useCallback } from 'react';

import Pylon from '@/api/Pylon';
import { type BridgeCurrency, BridgeCurrencyEnum } from '@/api/_types/bridge';

type UseBridgeAccountProps = {
  pylonInstance: Pylon;
  refreshInterval?: number;
};

const REFRESH_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

export function useBalance({
  pylonInstance,
  refreshInterval = REFRESH_INTERVAL,
}: UseBridgeAccountProps) {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<BridgeCurrency>(
    BridgeCurrencyEnum.USD
  );
  const [accountName, setAccountName] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBridgeAccount = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await pylonInstance.getPrefundedAccountBalance();
      const account = response.data[0]; // Assuming we're using the first account

      setBalance(Number(account.available_balance));
      setCurrency(account.currency);
      setAccountName(account.name);
      setAccountId(account.id);
    } catch (error) {
      console.error('Error fetching Bridge account:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pylonInstance]);

  useEffect(() => {
    fetchBridgeAccount();
    const intervalId = setInterval(fetchBridgeAccount, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchBridgeAccount, refreshInterval]);

  return { balance, currency, accountName, accountId, isLoading };
}
