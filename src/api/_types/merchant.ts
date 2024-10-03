type ISO3166Alpha2Country = 'GB' | 'US' | 'FR' | 'DE'; // Add more as needed
type ISO4217Currency = 'USD'; // Add more as needed
type BridgeComplianceKycStatus =
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'not_started'
  | 'incomplete'
  | 'awaiting_ubo'
  | 'manual_review'
  | 'under_review'
  | 'approved'
  | 'rejected';
type BridgeComplianceTosStatus = 'accepted' | 'pending';

type TransferStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
type PersonRole =
  | 'MEMBER'
  | 'DEVELOPER'
  | 'BOOKKEEPER'
  | 'ADMIN'
  | 'SUPER_ADMIN';
type Network =
  | 'POLYGON'
  | 'ETHEREUM'
  | 'ARBITRUM'
  | 'BASE'
  | 'SOLANA'
  | 'OPTIMISM';
type Currency = 'USDC' | 'USDT' | 'DAI';

type Address = {
  street1: string;
  street2?: string;
  street3?: string;
  city: string;
  postcode: string;
  state?: string;
  country: ISO3166Alpha2Country;
};

type RegisteredAddress = Address;

type BillingAddress = Address & {
  firstName: string;
  lastName: string;
};

type ShippingAddress = Address & {
  firstName: string;
  lastName: string;
};

type Company = {
  name: string;
  email: string;
  registeredAddress: RegisteredAddress;
};

type Representative = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  walletAddress?: string;
  role?: PersonRole;
};

type Compliance = {
  kycLink: string;
  tosLink: string;
  kycStatus: BridgeComplianceKycStatus;
  tosStatus: BridgeComplianceTosStatus;
};

type MerchantCreateInput = {
  fee: number;
  walletAddress: string;
  company: Company;
  representatives: Representative[];
  compliance?: {
    bridgeCustomerId: string;
    bridgeComplianceId: string;
  };
};

type MerchantCreateOutput = {
  statusCode: number;
  data: Compliance;
};

type ApiKeyCreateOutput = {
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  expires: string | null;
};

type ApiKeyUpdateInput = {
  name?: string;
  walletAddress?: string;
  network?: Network;
  currency?: Currency;
};

type ApiKeyGetOutput = {
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
};

type MerchantSettlementAccountGetOutput = {
  walletAddress: string;
  fee: string;
  network: Network;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
};

type MerchantSettlementAccountUpdateInput = {
  walletAddress?: string;
  network?: Network;
  currency?: Currency;
};

export type {
  ISO3166Alpha2Country,
  ISO4217Currency,
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
  TransferStatus,
  Address,
  RegisteredAddress,
  BillingAddress,
  ShippingAddress,
  Company,
  Compliance,
  MerchantCreateInput,
  MerchantCreateOutput,
  ApiKeyCreateOutput,
  ApiKeyUpdateInput,
  ApiKeyGetOutput,
  MerchantSettlementAccountGetOutput,
  MerchantSettlementAccountUpdateInput,
};
