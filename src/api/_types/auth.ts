type AccessTokenResponse = {
  token: string;
};

type IssueOTP = {
  email: string;
}

type VerifyOTP = {
  email: string;
  otp: string;
};

type ChallengeResponse = {
  challenge: string;
};

type PasskeyRegistrationData = {
  passkeyName?: string;
  username: string;
  credential: {
    id: string;
    algorithm: 'RS256' | 'ES256';
    publicKey: string;
  };
  authenticatorData: string;
  clientData: string;
  attestationData?: string;
  email: string;
  challenge: string;
};

type UserResponse = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

type PasskeyRegistrationResponse = {
  user: UserResponse;
  token: string;
};

type AuthenticatePasskeyData = {
  credentialId: string;
  authenticatorData: string;
  clientData: string;
  signature: string;
  userHandle?: string;
  challenge: string;
};

type InitiatePasskeyRegistrationData = {
  email: string;
};

type RegisterPasskeyForExistingUserData = {
  passkeyName?: string;
  credential: {
    id: string;
    algorithm: 'RS256' | 'ES256';
    publicKey: string;
  };
  authenticatorData: string;
  clientData: string;
  attestationData?: string;
  challenge: string;
};

type PasskeyListResponse = {
  passkeys: {
    id: string;
    name: string;
    credentialId: string;
  }[];
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

export type {
  AccessTokenResponse,
  ChallengeResponse,
  PasskeyRegistrationData,
  UserResponse,
  PasskeyRegistrationResponse,
  AuthenticatePasskeyData,
  InitiatePasskeyRegistrationData,
  RegisterPasskeyForExistingUserData,
  PasskeyListResponse,
  OTPData,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
  IssueOTP
};
