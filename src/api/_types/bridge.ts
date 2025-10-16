import { ComplianceStatus } from '../_enums';

enum BridgeCurrencyEnum {
  USD = 'usd',
  USDC = 'usdc',
}

type BridgePaymentRail = 'ach' | 'wire' | 'internal_transfer' | 'crypto';
type BridgeCurrency = BridgeCurrencyEnum.USD | BridgeCurrencyEnum.USDC;

type PrefundedAccountBalanceItem = {
  id: string;
  available_balance: string;
  currency: BridgeCurrency;
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

type CreatePrefundedAccountTransferResponse = any;

type GetComplianceStatusResponse = {
  kycLink: string;
  kycStatus: ComplianceStatus;
};

type GetVirtualAccountResponse = {
  id: string;
  status: string;
  developer_fee_percent: string;
  customer_id: string;
  source_deposit_instructions: {
    currency: string;
    bank_name: string;
    bank_address: string;
    bank_routing_number: string;
    bank_account_number: string;
    bank_beneficiary_name: string;
    bank_beneficiary_address: string;
    payment_rail: string;
    payment_rails: string[];
  };
  destination: {
    currency: string;
    payment_rail: string;
    address: string;
  };
};

type CreateVirtualAccountBody = {
  source: {
    currency: string;
  };
  destination: {
    address: string;
    currency: string;
    payment_rail: string;
  };
};

type UpdateVirtualAccountBody = {
  destination: {
    address: string;
    currency?: string;
    payment_rail?: string;
  };
};

export type {
  BridgePaymentRail,
  BridgeCurrency,
  PrefundedAccountBalanceItem,
  GetPrefundedAccountBalanceResponse,
  CreatePrefundedAccountTransferBody,
  CreatePrefundedAccountTransferResponse,
  GetComplianceStatusResponse,
  GetVirtualAccountResponse,
  CreateVirtualAccountBody,
  UpdateVirtualAccountBody,
};

export { BridgeCurrencyEnum };
