import {
  SortOrder,
  ISO3166Alpha2Country,
  PersonRole,
  Network,
  StableCurrency,
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
} from '../_enums/rain';
import {
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
} from '../_enums/bridge';
import { PasskeyMetadata } from './auth';

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
  firstName: string;
  lastName: string;
  birthDate: string;
  nationalId: string;
  countryOfIssue: ISO3166Alpha2Country;
  email: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  address: RainAddress;
};
type RainInitialUser = RainPerson & {
  walletAddress?: string;
};
type RainEntity = {
  name: string;
  description: string;
  industry: string;
  registrationNumber: string;
  taxId: string;
  website: string;
  type?: CardCompanyType;
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

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: PersonRole;
  phoneNumber?: string;
  walletAddress?: string;
  passkeyId?: string;
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

type Company = RainEntity & {
  email: string;
  registeredAddress: RegisteredAddress;
  controlOwner: RainInitialUser;
  ultimateBeneficialOwners: RainPerson[];
  representatives: RainPerson[];
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

type MerchantBillPayProvider = {
  kycLink: string;
  kycStatus: string;
  tosStatus: string;
};

type MerchantCardProviderUBO = {
  kycStatus: string;
  kycLink: string;
};

type MerchantCardProvider = {
  kycLink: string;
  kycStatus: string;
  tosStatus: string;
  ubo: MerchantCardProviderUBO[];
};

type MerchantCreateInput = {
  settlementAddress: string;
  isTermsOfServiceAccepted: boolean;
  users: User[];
  company: Company;
};

type MerchantCreateOutput = {
  billPayProvider: MerchantBillPayProvider;
  cardProvider: MerchantCardProvider;
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

type MerchantAccountGetOutput = {
  id: string;
  name: string;
  ledgerAddress: string;
  controllerAddress?: string;
  network: Network;
  currency: StableCurrency;
  isSettlement: boolean;
  createdAt: string;
  updatedAt: string;
  isDeployed: boolean;
  balance: string | undefined;
  threshold: number | null;
  signers: string[];
};

type MerchantAccountUpdateInput = {
  name?: string;
  ledgerAddress?: string;
  network?: Network;
  currency?: StableCurrency;
};

type MerchantAccountCreateInput = {
  name: string;
  ledgerAddress: string;
  network: Network;
  currency: StableCurrency;
};

type MerchantAccountRainCardWithdrawalRequestInput = {
  amount: string;
  adminAddress: string;
  recipientAddress: string;
};

type RainWithdrawalSignaturePending = {
  status: 'pending';
  retryAfter: number;
};

type RainWithdrawalSignatureReady = {
  status: 'ready';
  signature: {
    data: string;
    salt: string;
    expiresAt: string; // unix timestamp
  };
};

type MerchantAccountRainCardWithdrawalRequestOutput =
  | RainWithdrawalSignaturePending
  | RainWithdrawalSignatureReady;

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
  limit: number;
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
  rainKybStatus: CardCompanyStatus;
  rainKycStatus: CardCompanyStatus;
  rainKybLink: string;
  rainKycLink: string;
};

type MerchantUserGetOutput = {
  id: string;
  firstName: string;
  lastName: string;
  role: PersonRole;
  email: string;
  walletAddress?: string;
  phone?: string;
  username?: string;
  registeredPasskeys: MerchantUserPasskey[];
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

type MerchantUserPasskey = {
  id: string;
  credentialId: string;
  displayName: string;
  publicKey: string;
  rpId: string;
  lastUsedAt: string;
  counter: number;
  metadata?: PasskeyMetadata;
};

type MerchantUserCompliance = {
  id: number;
  provider: string;
  status: string;
};

type MerchantUserAccount = {
  id: string;
  name: string;
  ledgerAddress: string;
  network: Network;
  currency: StableCurrency;
  isSettlement: boolean;
};

type MerchantUserGetByIdOutput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
  hasMigratedPasskey: boolean;
  role: PersonRole;
  phone: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  registeredPasskeys: MerchantUserPasskey[];
  compliance: MerchantUserCompliance[];
  merchant: {
    id: number;
    bridgeCustomerId: string;
    rainCompanyId: string;
    company: {
      name: string;
      email: string;
    };
    compliance: MerchantUserCompliance[];
    accounts: MerchantUserAccount[];
  };
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

type MerchantRainCardBalanceOutput = {
  creditLimit: number;
  pendingCharges: number;
  postedCharges: number;
  balanceDue: number;
  spendingPower: number;
};

type MerchantTelegramMessageCreateInput = {
  text: string;
  file?: string;
};

type MerchantFileUploadInput = {
  fileName: string;
  mimeType: string;
};

type MerchantChatMessageEvent = {
  type: 'chat_message';
  data: {
    messageId: number;
    text: string;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    timestamp: string;
  };
};

type MerchantChatConnectionEvent = {
  connectionId: string;
  merchantId: string;
};

type MerchantChatEvent = MerchantChatMessageEvent | MerchantChatConnectionEvent;

export type {
  MerchantFileUploadInput,
  GetMerchantCardPinOutput,
  MerchantRainCardBalanceOutput,
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
  MerchantAccountGetOutput,
  MerchantAccountUpdateInput,
  MerchantAccountCreateInput,
  MerchantAccountRainCardWithdrawalRequestInput,
  RainWithdrawalSignatureReady,
  RainWithdrawalSignaturePending,
  MerchantAccountRainCardWithdrawalRequestOutput,
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
  MerchantUserGetByIdOutput,
  MerchantUserCompliance,
  MerchantUserAccount,
  MerchantTelegramMessageCreateInput,
  MerchantUserPasskey,
  MerchantChatEvent,
};
