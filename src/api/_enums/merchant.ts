enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum ISO3166Alpha2Country {
  GB = 'GB',
  US = 'US',
  FR = 'FR',
  DE = 'DE',
  // Add more as needed
}

enum ISO4217Currency {
  USD = 'USD',
  // Add more as needed
}

enum BridgeComplianceKycStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
  NOT_STARTED = 'not_started',
  INCOMPLETE = 'incomplete',
  AWAITING_UBO = 'awaiting_ubo',
  MANUAL_REVIEW = 'manual_review',
  UNDER_REVIEW = 'under_review',
}

enum BridgeComplianceTosStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
}

enum TransferStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

enum PersonRole {
  MEMBER = 'MEMBER',
  DEVELOPER = 'DEVELOPER',
  BOOKKEEPER = 'BOOKKEEPER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

enum Network {
  POLYGON = 'POLYGON',
  ETHEREUM = 'ETHEREUM',
  ARBITRUM = 'ARBITRUM',
  BASE = 'BASE',
  OPTIMISM = 'OPTIMISM',
}

enum StableCurrency {
  USDC = 'USDC',
  USDT = 'USDT',
  DAI = 'DAI',
}

enum FiatCurrency {
  USD = 'USD',
}

enum CardType {
  VIRTUAL = 'VIRTUAL',
  PHYSICAL = 'PHYSICAL',
}

enum CardStatus {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  CANCELLED = 'CANCELLED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
}

enum CardTransactionStatus {
  REVERSED = 'REVERSED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
}

enum CardProvider {
  RAIN = 'RAIN',
}

enum CardLimitFrequency {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  ALL_TIME = 'ALL_TIME',
  PER_AUTHORIZATION = 'PER_AUTHORIZATION',
}

enum CardShippingMethod {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  INTERNATIONAL = 'INTERNATIONAL',
}

enum CardCompanyStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  NEEDS_INFORMATION = 'needsInformation',
  NEEDS_VERIFICATION = 'needsVerification',
  MANUAL_REVIEW = 'manualReview',
  DENIED = 'denied',
  LOCKED = 'locked',
  CANCELED = 'canceled',
}

enum CardCompanyType {
  SOLE_PROPRIETORSHIP = 'sole_proprietorship',
  LLC = 'llc',
  C_CORP = 'c_corp',
  S_CORP = 's_corp',
  PARTNERSHIP = 'partnership',
  LP = 'lp',
  LLP = 'llp',
  NONPROFIT = 'nonprofit',
}

enum DisbursementMethod {
  WIRE = 'WIRE',
  ACH_SAME_DAY = 'ACH_SAME_DAY',
}

enum DisbursementContactType {
  EXTERNAL = 'EXTERNAL',
}

export {
  SortOrder,
  ISO3166Alpha2Country,
  ISO4217Currency,
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
  TransferStatus,
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
};
