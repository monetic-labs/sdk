// schemas/auth.ts
import { z } from 'zod';


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