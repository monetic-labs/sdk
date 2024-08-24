// schemas/auth.ts
import { z } from 'zod';

const v1 = '/v1';
const directory = `${v1}/auth`;

export const authEndpoints = {
    challenge: `${directory}/challenge`,
    passkeyRegister: `${directory}/passkey/register`,
    passkeyAuthenticate: `${directory}/passkey`,
    passkeyAddToken: `${directory}/add/send-token`,
    passkeyAdd: `${directory}/add`,
    passkeyList: `${directory}/passkey`,
    passkeyRemove: `${directory}/passkey/:id`,
    otpIssue: `${directory}/otp/issue`,
    otpVerify: `${directory}/otp/verify`,
    jwtGenerate: `${directory}/jwt`,
    jwtDelete: `${directory}/jwt`,
  } as const;
  

  export const generateChallenge = {
    response: z.object({
      challenge: z.string(),
    }),
  };
  

  export const registerPasskey = {
    body: z.object({
      passkeyName: z.string().optional(),
      username: z.string(),
      credential: z.object({
        id: z.string(),
        algorithm: z.enum(['RS256', 'ES256']),
        publicKey: z.string(),
      }),
      authenticatorData: z.string(),
      clientData: z.string(),
      attestationData: z.string().optional(),
      email: z.string().email(),
      challenge: z.string(),
    }),
    response: z.object({
      user: z.object({
        id: z.string(),
        email: z.string().email(),
        username: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      token: z.string(),
    }),
  };
  
  export const authenticatePasskey = {
    body: z.object({
      credentialId: z.string(),
      authenticatorData: z.string(),
      clientData: z.string(),
      signature: z.string(),
      userHandle: z.string().optional(),
      challenge: z.string(),
    }),
    response: z.object({
      user: z.object({
        id: z.string(),
        email: z.string().email(),
        username: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      token: z.string(),
    }),
  };

  export const initiatePasskeyRegistration = {
    body: z.object({
      email: z.string().email(),
    }),
    response: z.object({
      message: z.string(),
    }),
  };
  
  export const registerPasskeyForExistingUser = {
    body: z.object({
      passkeyName: z.string().optional(),
      credential: z.object({
        id: z.string(),
        algorithm: z.enum(['RS256', 'ES256']),
        publicKey: z.string(),
      }),
      authenticatorData: z.string(),
      clientData: z.string(),
      attestationData: z.string().optional(),
      challenge: z.string(),
    }),
    response: z.object({
      message: z.string(),
    }),
  };
  
  export const removePasskey = {
    params: z.object({
      id: z.number(),
    }),
    response: z.object({
      message: z.string(),
    }),
  };
  
  export const findPasskeysForUser = {
    response: z.object({
      passkeys: z.array(z.object({
        id: z.number(),
        name: z.string().optional(),
        credentialId: z.string(),
        // Add other passkey fields as needed
      })),
    }),
  };
  
  export const issueOTP = {
    body: z.object({
      email: z.string().email(),
    }),
    response: z.object({
      message: z.string(),
    }),
  };
  
  export const verifyOTP = {
    body: z.object({
      email: z.string().email(),
      otp: z.string().length(6),
    }),
    response: z.object({
      message: z.string(),
    }),
  };
  
  export const generateFarcasterJWT = {
    body: z.object({
      fid: z.number(),
      signerUuid: z.string(),
    }).transform(data => ({
      fid: data.fid,
      signerUuid: data.signerUuid
    })),
    response: z.object({
      message: z.string(),
    }),
  };
  

  export const deleteFarcasterJWT = {
    response: z.object({
      message: z.string(),
    }),
  };

  // Export types
  export type AuthEndpoints = typeof authEndpoints;
  export type GenerateChallengeResponse = z.infer<typeof generateChallenge.response>;
  export type RegisterPasskeyResponse = z.infer<typeof registerPasskey.response>;
  export type AuthenticatePasskeyResponse = z.infer<typeof authenticatePasskey.response>;
  export type AuthenticatePasskeyBody = z.infer<typeof authenticatePasskey.body>;
  export type InitiatePasskeyRegistrationResponse = z.infer<typeof initiatePasskeyRegistration.response>;
  export type RegisterPasskeyForExistingUserResponse = z.infer<typeof registerPasskeyForExistingUser.response>;
  export type RegisterPasskeyForExistingUserBody = z.infer<typeof registerPasskeyForExistingUser.body>;
  export type RemovePasskeyResponse = z.infer<typeof removePasskey.response>;
  export type FindPasskeysForUserResponse = z.infer<typeof findPasskeysForUser.response>;
  export type IssueOTPResponse = z.infer<typeof issueOTP.response>;
  export type VerifyOTPResponse = z.infer<typeof verifyOTP.response>;
  export type GenerateFarcasterJWTResponse = z.infer<typeof generateFarcasterJWT.response>;
  export type GenerateFarcasterJWTBody = z.infer<typeof generateFarcasterJWT.body>;
  export type DeleteFarcasterJWTResponse = z.infer<typeof deleteFarcasterJWT.response>;
  



