type BridgePaymentRail = 'ach' | 'wire' | 'internal_transfer' | 'crypto';
type BridgeCurrency = 'USD' | 'USDC';

type PrefundedAccountBalanceItem = {
  id: string;
  available_balance: string;
  currency: string;
  name: string;
};

type GetPrefundedAccountBalanceResponse = {
  data: PrefundedAccountBalanceItem[];
};

type CreatePrefundedAccountTransferBody = {
  amount: number;
  on_behalf_of: string;
  developer_fee?: number;
  source: {
    payment_rail: BridgePaymentRail;
    currency: BridgeCurrency;
    prefunded_account_id: string;
  };
  destination: {
    payment_rail: BridgePaymentRail;
    currency: BridgeCurrency;
    to_address: string;
  };
};

type CreatePrefundedAccountTransferResponse = any; // Define a more specific type based on the actual API response

export type {
  BridgePaymentRail,
  BridgeCurrency,
  PrefundedAccountBalanceItem,
  GetPrefundedAccountBalanceResponse,
  CreatePrefundedAccountTransferBody,
  CreatePrefundedAccountTransferResponse,
};
