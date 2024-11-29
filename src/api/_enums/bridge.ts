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

export { BridgeComplianceKycStatus, BridgeComplianceTosStatus };
