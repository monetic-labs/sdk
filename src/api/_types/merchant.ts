type SortOrder = 'asc' | 'desc';
type Pagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

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

type CardType = 'VIRTUAL' | 'PHYSICAL';
type CardStatus = 'ACTIVE' | 'LOCKED' | 'CANCELLED' | 'NOT_ACTIVATED';
type CardTransactionStatus = 'REVERSED' | 'PENDING' | 'COMPLETED' | 'DECLINED';
type CardProvider = 'RAIN';
type CardLimitFrequency =
  | 'DAY'
  | 'WEEK'
  | 'MONTH'
  | 'YEAR'
  | 'ALL_TIME'
  | 'PER_AUTHORIZATION';
type CardShippingMethod = 'STANDARD' | 'EXPRESS' | 'INTERNATIONAL';
type CardCompanyStatus =
  | 'approved'
  | 'pending'
  | 'needsInformation'
  | 'needsVerification'
  | 'manualReview'
  | 'denied'
  | 'locked'
  | 'canceled';

type RainAddress = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: ISO3166Alpha2Country;
  country: string;
};
type RainPerson = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationalId: string;
  countryOfIssue: ISO3166Alpha2Country;
  email: string;
  address: RainAddress;
};
type RainInitialUser = RainPerson & {
  isTermsOfServiceAccepted: boolean;
  role?: string;
  walletAddress?: string;
  ipAddress: string;
  iovationBlackbox: string;
};
type RainEntity = {
  name: string;
  type: string;
  description: string;
  taxId: string;
  website: string;
  expectedSpend: string;
};

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

type CardShippingDetails = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: ISO3166Alpha2Country;
  phoneNumber: string;
  phoneCountryCode: string;
  shippingMethod?: CardShippingMethod;
};

type MerchantVirtualCardCreateInput = {
  displayName: string;
  status: CardStatus;
  owner: {
    email: string;
    firstName: string;
    lastName: string;
  };
  limit: {
    amount: number;
    frequency: CardLimitFrequency;
  };
};

type MerchantVirtualCardDecryptOutput = {
  decryptedPan: string;
  decryptedCvc: string;
};

type MerchantVirtualCardCreateOutput = {
  id: string;
  providerCardId: string;
  version: number;
  displayName: string;
  limit: number;
  limitFrequency: CardLimitFrequency;
  lastFour: string;
  expirationMonth: string;
  expirationYear: string;
  cardProvider: CardProvider;
  cardType: CardType;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
  cardShippingDetailsId: string | null;
  cardOwnerId: string;
};

type MerchantPhysicalCardCreateInput = {
  status: CardStatus;
  displayName: string;
  owner: {
    email: string;
    firstName: string;
    lastName: string;
  };
  limit: {
    amount: number;
    frequency: CardLimitFrequency;
  };
  shipping: CardShippingDetails;
};

type MerchantPhysicalCardCreateOutput = {
  id: string;
  providerCardId: string;
  version: number;
  displayName: string;
  limit: number;
  limitFrequency: CardLimitFrequency;
};

type MerchantCardGetInput = {
  cardId?: string;
  status?: CardTransactionStatus;
  startDate?: string | Date;
  endDate?: string | Date;
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  before?: string;
  after?: string;
  sortField?: string;
  sortOrder?: SortOrder;
};

type MerchantCardGetOutput = {
  cards: {
    id: string;
    displayName: string;
    lastFour: string;
    expirationMonth: string;
    expirationYear: string;
    status: CardStatus;
    createdAt: string;
    cardOwner: {
      firstName: string;
      lastName: string;
      email: string;
    };
    cardShippingDetails: null;
  }[];
  meta: Pagination;
};

type MerchantCardTransactionGetInput = {
  cardId?: string;
  status?: CardTransactionStatus;
  startDate?: string | Date;
  endDate?: string | Date;
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
  limit?: number;
  before?: string;
  after?: string;
  sortField?: string;
  sortOrder?: SortOrder;
};

type MerchantCardTransactionGetOutput = {
  transactions: {
    id: string;
    providerTransactionId: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    status: CardTransactionStatus;
    amount: number;
    currency: string;
    localAmount: number;
    localCurrency: string;
    authorizedAmount: number;
    merchantName: string;
    merchantCity: string | null;
    merchantCountry: string | null;
    merchantCategory: string | null;
    merchantCategoryCode: string | null;
    merchant: {
      bridgeCustomerId: string;
      rainCompanyId: string;
    };
    merchantCard: {
      id: string;
      providerCardId: string;
      cardOwnerId: string;
    };
  }[];
  meta: Pagination;
};

type MerchantRainCompanyCreateInput = {
  initialUser: RainInitialUser;
  address: RainAddress;
  entity: RainEntity;
  name: string;
  chainId: string;
  contractAddress: string;
  representatives: RainPerson[];
  ultimateBeneficialOwners: RainPerson[];
};

type MerchantRainCompanyCreateOutput = {
  merchant: {
    rainCompanyId: string;
  };
  provider: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type MerchantRainCompanyUpdateInput = {
  initialUser: RainInitialUser;
  address: RainAddress;
  entity: RainEntity;
  name: string;
  chainId: string;
  contractAddress: string;
  representatives: RainPerson[];
  ultimateBeneficialOwners: RainPerson[];
};

type MerchantRainCompanyUpdateOutput = {
  merchant: {
    rainCompanyId: string;
  };
  provider: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type MerchantRainCompanyStatusOutput = {
  id: string;
  applicationStatus: CardCompanyStatus;
};

type MerchantUserGetOutput = {
  id: string;
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  phone: string | null;
  walletAddress: string | null;
  username: string | null;
};

type MerchantUserCreateInput = {
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  walletAddress: string;
  phone: string;
  username: string;
};

type MerchantUserUpdateInput = {
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  walletAddress: string;
  phone: string;
  username: string;
};

export type {
  ISO3166Alpha2Country,
  ISO4217Currency,
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
  TransferStatus,
  Network,
  Currency,
  PersonRole,
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
  CardType,
  CardStatus,
  CardTransactionStatus,
  CardProvider,
  CardLimitFrequency,
  CardShippingMethod,
  CardShippingDetails,
  CardCompanyStatus,
  MerchantVirtualCardCreateInput,
  MerchantVirtualCardCreateOutput,
  MerchantVirtualCardDecryptOutput,
  MerchantPhysicalCardCreateInput,
  MerchantPhysicalCardCreateOutput,
  MerchantCardGetInput,
  MerchantCardGetOutput,
  MerchantCardTransactionGetInput,
  MerchantCardTransactionGetOutput,
  MerchantRainCompanyCreateInput,
  MerchantRainCompanyCreateOutput,
  MerchantRainCompanyUpdateInput,
  MerchantRainCompanyUpdateOutput,
  MerchantRainCompanyStatusOutput,
  MerchantUserCreateInput,
  MerchantUserGetOutput,
  MerchantUserUpdateInput,
};
