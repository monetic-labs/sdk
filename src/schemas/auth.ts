// schemas/auth.ts
import { z } from 'zod';

export const AuthSchema = {
  generateChallenge: {
    response: z.object({
      challenge: z.string(),
    }),
  },

  registerPasskey: {
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
  },

  authenticatePasskey: {
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
  },

  initiatePasskeyRegistration: {
    body: z.object({
      email: z.string().email(),
    }),
    response: z.object({
      message: z.string(),
    }),
  },

  registerPasskeyForExistingUser: {
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
  },

  removePasskey: {
    params: z.object({
      id: z.number(),
    }),
    response: z.object({
      message: z.string(),
    }),
  },

  findPasskeysForUser: {
    response: z.object({
      passkeys: z.array(z.object({
        id: z.number(),
        name: z.string().optional(),
        credentialId: z.string(),
        // Add other passkey fields as needed
      })),
    }),
  },

  issueOTP: {
    body: z.object({
      email: z.string().email(),
    }),
    response: z.object({
      message: z.string(),
    }),
  },

  verifyOTP: {
    body: z.object({
      email: z.string().email(),
      otp: z.string().length(6),
    }),
    response: z.object({
      message: z.string(),
    }),
  },

  generateFarcasterJWT: {
    body: z.object({
      fid: z.number(),
      signerUuid: z.string(),
      signer_uuid: z.string().optional(),
    }).transform(data => ({
      fid: data.fid,
      signerUuid: data.signerUuid || data.signer_uuid,
    })),
    response: z.object({
      message: z.string(),
    }),
  },

  deleteFarcasterJWT: {
    response: z.object({
      message: z.string(),
    }),
  },
};

export type AuthSchemaType = typeof AuthSchema;