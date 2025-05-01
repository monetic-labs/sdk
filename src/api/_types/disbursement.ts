import { Network, StableCurrency, FiatCurrency } from '../_enums/merchant';
import {
  DisbursementMethod,
  DisbursementState,
  DisbursementProvider,
} from '../_enums/disbursement';
import { Pagination, BridgeAddress } from './merchant';
type MerchantDisbursementCreateInput = {
  account_owner_name: string;
  bank_name: string;
  account: {
    account_number: string;
    routing_number: string;
  };
  address: BridgeAddress;
  chain: Network;
  currency: StableCurrency;
  return_address: string;
  destination: {
    payment_rail: DisbursementMethod;
    currency: FiatCurrency;
    wire_message?: string;
    ach_reference?: string;
  };
};

type MerchantDisbursement = {
  id: string;
  disbursementContactId: string;
  method: DisbursementMethod;
  network: Network;
  stableCurrency: StableCurrency;
  address: string;
  returnAddress: string;
  paymentMessage: string;
};

type MerchantDisbursementCreateOutput = {
  id: string;
  beneficiaryAddressId: string;
  network: Network;
  stableCurrency: StableCurrency;
  address: string;
  routingNumber: string;
  accountNumber: string;
  accountOwnerName: string;
  bankName: string;
  fiatCurrency: FiatCurrency;
  nickname?: string;
  returnAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  disbursements: MerchantDisbursement[];
};

type MerchantDisbursementUpdateInput = {
  returnAddress?: string;
  destination?: {
    payment_rail: DisbursementMethod;
    wire_message?: string;
    ach_reference?: string;
  };
};

type MerchantDisbursementUpdateOutput = {
  id: string;
  disbursementContactId: string;
  method: DisbursementMethod;
  network: Network;
  stableCurrency: StableCurrency;
  address: string;
  returnAddress: string;
  paymentMessage: string;
  fee: string;
};

type MerchantDisbursementEventGetOutput = {
  id: string;
  contactId: string;
  amountIn: string;
  amountOut: string;
  fee: string;
  currencyIn: StableCurrency;
  currencyOut: FiatCurrency;
  state: DisbursementState;
  provider: DisbursementProvider;
  depositTxHash: string;
  paymentMethod?: DisbursementMethod;
  paymentMessage?: string;
  paymentTrackingNumber?: string;
  exchangeRate?: string;
  returnReason?: string;
  createdAt: string;
  updatedAt: string;
  contact: MerchantDisbursementCreateOutput;
};

type MerchantDisbursementEventsOutput = {
  events: MerchantDisbursementEventGetOutput[];
  meta: Pagination;
};

type MerchantDisbursementEventsInput = {
  limit?: number;
  before?: string;
  after?: string;
};

type MerchantDisbursementContactGetAllInput = {
  search?: string;
  limit?: number;
  before?: string;
  after?: string;
};

type MerchantDisbursementContactGetOutput = {
  contacts: MerchantDisbursementCreateOutput[];
  meta: Pagination;
};

// Export all new/updated types
export type {
  MerchantDisbursementCreateInput,
  MerchantDisbursementCreateOutput,
  MerchantDisbursementUpdateInput,
  MerchantDisbursementUpdateOutput,
  MerchantDisbursementEventsInput,
  MerchantDisbursementEventsOutput,
  MerchantDisbursementEventGetOutput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
};
