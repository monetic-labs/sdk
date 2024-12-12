import {
  SortOrder,
  ISO3166Alpha2Country,
  PersonRole,
  Network,
  StableCurrency,
  FiatCurrency,
  ISO3166Alpha2State,
  ISO3166Alpha3Country,
} from '../_enums/merchant';
import {
  CardType,
  CardStatus,
  CardTransactionStatus,
  CardProvider,
  CardLimitFrequency,
  CardShippingMethod,
  CardCompanyStatus,
  CardCompanyType,
  DisbursementMethod,
  DisbursementState,
  DisbursementProvider,
} from '../_enums/rain';
import {
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
} from '../_enums/bridge';

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
  role?: string;
  isTermsOfServiceAccepted: boolean;
  walletAddress?: string;
  iovationBlackbox?: string;
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

type BridgeAddress = {
  street1: string;
  street2?: string;
  city: string;
  postcode?: string;
  state?: ISO3166Alpha2State;
  country: ISO3166Alpha3Country;
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

type CardShippingDetails = RainAddress & {
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

type MerchantCard = {
  id: string;
  displayName: string;
  lastFour: string;
  expirationMonth: string;
  expirationYear: string;
  status: CardStatus;
  createdAt: string;
  cardOwner: MerchantCardOwner;
  cardShippingDetails?: CardShippingDetails;
  limit: Number;
  limitFrequency: CardLimitFrequency;
};

type MerchantCardOwner = {
  id: bigint;
  rainId: string;
  firstName: string;
  lastName: string;
  email: string;
  version: number;
};

type MerchantCardTransaction = {
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
  merchant: MerchantCreateInput;
  merchantCard: MerchantCard;
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
  cards: MerchantCard[];
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
  transactions: MerchantCardTransaction[];
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
  merchant: MerchantCreateInput;
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
  merchant: MerchantCreateInput;
  provider: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type MerchantRainCompanyStatusOutput = {
  status: CardCompanyStatus;
  link: string;
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
  address: BridgeAddress;
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
  amount: number;
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

type UpdateMerchantCardDataInput = {
  limit?: {
    amount: number;
    frequency: CardLimitFrequency;
  };
  status?: CardStatus;
  cardId: string;
};

type UpdateMerchantCardPinInput = {
  cardId: string;
  pin: string;
};

type GetMerchantCardPinInput = {
  cardId: string;
};

type UpdateMerchantCardDataOutput = MerchantCard;

type UpdateMerchantCardPinOutput = {};

type GetMerchantCardPinOutput = {
  result: string;
};

type MerchantTelegramMessageCreateInput = {
  text: string;
  file?: string;
};

export type {
  GetMerchantCardPinOutput,
  UpdateMerchantCardPinOutput,
  UpdateMerchantCardDataOutput,
  GetMerchantCardPinInput,
  UpdateMerchantCardPinInput,
  UpdateMerchantCardDataInput,
  Pagination,
  Address,
  BridgeAddress,
  RegisteredAddress,
  Representative,
  BillingAddress,
  ShippingAddress,
  RainAddress,
  RainPerson,
  RainInitialUser,
  RainEntity,
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
  CardCompanyType,
  MerchantCardOwner,
  MerchantCardTransaction,
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
  MerchantDisbursementEventsInput,
  MerchantDisbursementEventsOutput,
  MerchantDisbursementEventGetOutput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
  MerchantTelegramMessageCreateInput,
};
