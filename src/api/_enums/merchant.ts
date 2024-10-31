enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum ISO3166Alpha2Country {
  GB = 'GB',
  US = 'US',
  FR = 'FR',
  DE = 'DE',
  CA = 'CA',
  AU = 'AU',
  JP = 'JP',
  IT = 'IT',
  ES = 'ES',
  NL = 'NL',
  CH = 'CH',
  SE = 'SE',
  DK = 'DK',
  NO = 'NO',
  BE = 'BE',
  AT = 'AT',
  FI = 'FI',
  GR = 'GR',
  PT = 'PT',
  IE = 'IE',
  LU = 'LU',
  IS = 'IS',
  AL = 'AL',
  AD = 'AD',
  AM = 'AM',
  BY = 'BY',
  BA = 'BA',
  BG = 'BG',
  HR = 'HR',
  CY = 'CY',
  CZ = 'CZ',
  EE = 'EE',
  GE = 'GE',
  HU = 'HU',
  KZ = 'KZ',
  XK = 'XK',
  LV = 'LV',
  LI = 'LI',
  LT = 'LT',
  MK = 'MK',
  MT = 'MT',
  MD = 'MD',
  MC = 'MC',
  ME = 'ME',
  PL = 'PL',
  RO = 'RO',
  RU = 'RU',
  SM = 'SM',
  RS = 'RS',
  SK = 'SK',
  SI = 'SI',
  TR = 'TR',
  UA = 'UA',
  VA = 'VA',
  // Add more as needed
}

enum ISO3166Alpha3Country {
  GBR = 'GBR',
  USA = 'USA',
  FRA = 'FRA',
  DEU = 'DEU',
  CAN = 'CAN',
  AUS = 'AUS',
  JPN = 'JPN',
  ITA = 'ITA',
  ESP = 'ESP',
  NLD = 'NLD',
  CHE = 'CHE',
  SWE = 'SWE',
  DNK = 'DNK',
  NOR = 'NOR',
  BEL = 'BEL',
  AUT = 'AUT',
  FIN = 'FIN',
  GRC = 'GRC',
  PRT = 'PRT',
  IRL = 'IRL',
  LUX = 'LUX',
  ISL = 'ISL',
  ALB = 'ALB',
  AND = 'AND',
  ARM = 'ARM',
  BLR = 'BLR',
  BIH = 'BIH',
  BGR = 'BGR',
  HRV = 'HRV',
  CYP = 'CYP',
  CZE = 'CZE',
  EST = 'EST',
  GEO = 'GEO',
  HUN = 'HUN',
  KAZ = 'KAZ',
  LVA = 'LVA',
  LIE = 'LIE',
  LTU = 'LTU',
  MKD = 'MKD',
  MLT = 'MLT',
  MDA = 'MDA',
  MCO = 'MCO',
  MNE = 'MNE',
  POL = 'POL',
  ROU = 'ROU',
  RUS = 'RUS',
  SMR = 'SMR',
  SRB = 'SRB',
  SVK = 'SVK',
  SVN = 'SVN',
  TUR = 'TUR',
  UKR = 'UKR',
  VAT = 'VAT',
  // Add more as needed
}

enum ISO3166Alpha2State {
  AL = 'AL',
  AK = 'AK',
  AZ = 'AZ',
  AR = 'AR',
  CA = 'CA',
  CO = 'CO',
  CT = 'CT',
  DE = 'DE',
  FL = 'FL',
  GA = 'GA',
  HI = 'HI',
  ID = 'ID',
  IL = 'IL',
  IN = 'IN',
  IA = 'IA',
  KS = 'KS',
  KY = 'KY',
  LA = 'LA',
  ME = 'ME',
  MD = 'MD',
  MA = 'MA',
  MI = 'MI',
  MN = 'MN',
  MS = 'MS',
  MO = 'MO',
  MT = 'MT',
  NE = 'NE',
  NV = 'NV',
  NH = 'NH',
  NJ = 'NJ',
  NM = 'NM',
  NY = 'NY',
  NC = 'NC',
  ND = 'ND',
  OH = 'OH',
  OK = 'OK',
  OR = 'OR',
  PA = 'PA',
  RI = 'RI',
  SC = 'SC',
  SD = 'SD',
  TN = 'TN',
  TX = 'TX',
  UT = 'UT',
  VT = 'VT',
  VA = 'VA',
  WA = 'WA',
  WV = 'WV',
  WI = 'WI',
  WY = 'WY',
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

enum DisbursementState {
  PENDING = 'PENDING',
  AWAITING_FUNDS = 'AWAITING_FUNDS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_REVIEW = 'IN_REVIEW',
  FUNDS_RECEIVED = 'FUNDS_RECEIVED',
  PAYMENT_SUBMITTED = 'PAYMENT_SUBMITTED',
  PAYMENT_PROCESSED = 'PAYMENT_PROCESSED',
  CANCELED = 'CANCELED',
  ERROR = 'ERROR',
  RETURNED = 'RETURNED',
  REFUNDED = 'REFUNDED',
}

enum DisbursementProvider {
  BRIDGE = 'BRIDGE',
}

export {
  SortOrder,
  ISO3166Alpha2Country,
  ISO3166Alpha3Country,
  ISO3166Alpha2State,
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
  DisbursementState,
  DisbursementProvider,
};
