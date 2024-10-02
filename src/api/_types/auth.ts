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

export type {
  AccessTokenResponse,
  UserResponse,
  OTPData,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
  IssueOTP,
};
