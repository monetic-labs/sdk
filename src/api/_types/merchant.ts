import {
  SortOrder,
  ISO3166Alpha2Country,
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
  PersonRole,
  Network,
  StableCurrency,
  FiatCurrency,
  CardType,
  CardStatus,
  CardTransactionStatus,
  CardProvider,
  CardLimitFrequency,
  CardShippingMethod,
  CardCompanyStatus,
  CardCompanyType,
  DisbursementMethod,
  DisbursementContactType,
  DisbursementState,
  DisbursementProvider,
} from '../_enums/merchant';

type Pagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

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
  id?: string;
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
};
type RainEntity = {
  name: string;
  type?: CardCompanyType;
  description?: string;
  taxId: string;
  website: string;
  expectedSpend?: string;
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
  currency?: StableCurrency;
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
  currency: StableCurrency;
  createdAt: string;
  updatedAt: string;
};

type MerchantSettlementAccountUpdateInput = {
  walletAddress?: string;
  network?: Network;
  currency?: StableCurrency;
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
  applicationExternalVerificationLink: {
    url: string;
    params: {
      userId: string;
    };
  };
  applicationCompletionLink: {
    url: string;
    params: {
      userId: string;
    };
  };
};

type MerchantUserGetOutput = {
  id: string;
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  phone?: string;
  walletAddress?: string;
  username?: string;
};

type MerchantUserCreateInput = {
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  walletAddress?: string;
  phone?: string;
  username?: string;
};

type MerchantUserUpdateInput = {
  firstName?: string;
  lastName?: string;
  role?: PersonRole;
  email?: string;
  walletAddress?: string;
  phone?: string;
  username?: string;
};

type MerchantDisbursementCreateInput = {
  account_owner_name: string;
  bank_name: string;
  account: {
    account_number: string;
    routing_number: string;
  };
  address: Address;
  chain: Network;
  currency: StableCurrency;
  return_address: string;
  amount: number;
  destination: {
    payment_rail: DisbursementMethod;
    currency: FiatCurrency;
    wire_message?: string;
    ach_reference?: string;
  };
};

type MerchantDisbursementCreateOutput = {
  id: string;
  liquidationAddressId: string;
  beneficiaryAddressId: string;
  contactType: DisbursementContactType;
  chainId: Network;
  stableCurrency: StableCurrency;
  liquidationNetwork: Network;
  liquidationStableCurrency: StableCurrency;
  liquidationAddress: string;
  routingNumber: string;
  accountNumber: string;
  accountOwnerName: string;
  bankName: string;
  fiatCurrency: FiatCurrency;
  methodsAccepted: DisbursementMethod[];
  nickname?: string;
  returnAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type MerchantDisbursementUpdateInput = {
  amount?: number;
  returnAddress?: string;
  nickname?: string;
  destination?: {
    payment_rail: DisbursementMethod;
    wire_message?: string;
    ach_reference?: string;
  };
};

type MerchantDisbursementUpdateOutput = {
  id: string;
  contactId: string;
  liquidationAddress: string;
  liquidationNetwork: Network;
  liquidationStableCurrency: StableCurrency;
  expectedDestinationWireMessage?: string;
  developerFeePercent?: string;
  returnAddress: string;
  updatedAt: string;
  createdAt: string;
};

type MerchantDisbursementGetOutput = {
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

type MerchantDisbursementGetAllOutput = {
  disbursements: MerchantDisbursementGetOutput[];
  meta: Pagination;
};

type MerchantDisbursementGetAllInput = {
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

export type {
  Pagination,
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
  MerchantDisbursementCreateInput,
  MerchantDisbursementCreateOutput,
  MerchantDisbursementUpdateInput,
  MerchantDisbursementUpdateOutput,
  MerchantDisbursementGetAllInput,
  MerchantDisbursementGetOutput,
  MerchantDisbursementGetAllOutput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
};
