type AccessTokenResponse = {
  token: string;
};

type IssueOTP = {
  email: string;
};

type VerifyOTP = {
  email: string;
  otp: string;
};

type UserResponse = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

type OTPData = {
  email: string;
  otp?: string;
};

type FarcasterJWTData = {
  fid: number;
  signerUuid: string;
};

type MessageResponse = {
  message: string;
};

type Passkey = {
  id: string;
  credentialId: string;
  rpId: string;
};

type PasskeyMetadata = {
  authenticatorData: string;
  challengeIndex: number;
  clientDataJSON: string;
  typeIndex: number;
  userVerificationRequired: boolean;
  signCount?: number;
};

type PasskeySignature = {
  r: string;
  s: string;
  yParity?: number | undefined;
};

type GenerateChallengeResponse = {
  challenge: string;
};

type ResidentKeyRequirement = 'discouraged' | 'preferred' | 'required';
type UserVerificationRequirement = 'discouraged' | 'preferred' | 'required';
type AttestationConveyancePreference =
  | 'direct'
  | 'enterprise'
  | 'indirect'
  | 'none';

type PasskeyRegistrationOptionsResponse = {
  challenge: string;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  authenticatorSelection: {
    residentKey: ResidentKeyRequirement;
    userVerification: UserVerificationRequirement;
    requireResidentKey: boolean;
  };
  timeout: number;
  attestation: AttestationConveyancePreference;
  excludeCredentials: string[];
  extensions: {
    credProps: boolean;
    minPinLength: boolean;
  };
};

type RegisterPasskeyInput = {
  credentialId: string;
  publicKey: string;
  transports: string[];
  challenge: string;
  displayName?: string;
  counter?: number;
};

type RegisterPasskeyResponse = {
  passkeyId: string;
};

type AuthenticatePasskeyInput = {
  credentialId: string;
  challenge: string;
  metadata: PasskeyMetadata;
  signature: PasskeySignature;
};

type AuthenticatePasskeyResponse = {
  user: {
    id: string;
    walletAddress: string;
    merchantId: string;
  };
  token: string;
  publicKey: string;
};

type UpdatePasskeyInput = {
  displayName: string;
};

type AddEmailToBetaListInput = {
  email: string;
};

type AddMultipleEmailsToBetaListInput = {
  emails: string[];
};

type BetaListEntry = {
  id: string;
  email: string;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
};

type BetaListResponse = {
  betaList: BetaListEntry[];
  count: number;
};

type AddEmailToBetaListResponse = {
  message: string;
  email: string;
};

type AddMultipleEmailsToBetaListResponse = {
  message: string;
  results: { email: string; status: 'added' | 'exists' | 'invalid' }[];
  summary: { added: number; existing: number; invalid: number; total: number };
};

type RemoveEmailFromBetaListResponse = {
  message: string;
  email: string;
  wasUsed: boolean;
};

export type {
  AccessTokenResponse,
  UserResponse,
  OTPData,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
  IssueOTP,
  Passkey,
  GenerateChallengeResponse,
  RegisterPasskeyInput,
  PasskeyRegistrationOptionsResponse,
  RegisterPasskeyResponse,
  AuthenticatePasskeyInput,
  AuthenticatePasskeyResponse,
  PasskeyMetadata,
  UpdatePasskeyInput,
  AddEmailToBetaListInput,
  AddMultipleEmailsToBetaListInput,
  BetaListEntry,
  BetaListResponse,
  AddEmailToBetaListResponse,
  AddMultipleEmailsToBetaListResponse,
  RemoveEmailFromBetaListResponse,
};
