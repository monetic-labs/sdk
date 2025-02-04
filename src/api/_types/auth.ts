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

type PasskeyMetadata = {
  authenticatorData: string;
  challengeIndex: number;
  clientDataJSON: string;
  typeIndex: number;
  userVerificationRequired: boolean;
};

type PasskeySignature = {
  r: string;
  s: string;
  yParity?: number | undefined;
};

type GenerateChallengeResponse = {
  challenge: string;
};

type RegisterPasskeyInput = {
  credentialId: string;
  publicKey: string;
  displayName?: string;
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

export type {
  AccessTokenResponse,
  UserResponse,
  OTPData,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
  IssueOTP,
  GenerateChallengeResponse,
  RegisterPasskeyInput,
  RegisterPasskeyResponse,
  AuthenticatePasskeyInput,
  AuthenticatePasskeyResponse,
};
