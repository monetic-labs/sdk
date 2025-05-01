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
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  NOT_STARTED = 'NOT_STARTED',
  NEEDS_INFORMATION = 'NEEDS_INFORMATION',
  NEEDS_VERIFICATION = 'NEEDS_VERIFICATION',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  DENIED = 'DENIED',
  LOCKED = 'LOCKED',
  CANCELED = 'CANCELED',
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

enum RainComplianceKybStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  NEEDS_INFORMATION = 'needsInformation',
  NEEDS_VERIFICATION = 'needsVerification',
  MANUAL_REVIEW = 'manualReview',
  DENIED = 'denied',
  LOCKED = 'locked',
  CANCELED = 'canceled',
}

export {
  CardType,
  CardStatus,
  CardTransactionStatus,
  CardProvider,
  CardLimitFrequency,
  CardShippingMethod,
  CardCompanyStatus,
  CardCompanyType,
  RainComplianceKybStatus,
};
