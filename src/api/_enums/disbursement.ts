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

export { DisbursementMethod, DisbursementState, DisbursementProvider };
