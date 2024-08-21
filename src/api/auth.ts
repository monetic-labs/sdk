import { PylonApiClient } from '@/client';
import * as AuthSchema from "@/schemas/auth";
import { z } from 'zod';

export const generateChallenge = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.generateChallenge.response>>('/auth/challenge');

export const registerPasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskey.response>>('/auth/register-passkey', data);

export const authenticatePasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.authenticatePasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.authenticatePasskey.response>>('/auth/authenticate-passkey', data);

export const findPasskeysForUser = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.findPasskeysForUser.response>>('/auth/passkeys');

export const removePasskey = (client: PylonApiClient) => 
  (id: number) => client.delete<z.infer<typeof AuthSchema.removePasskey.response>>(`/auth/passkey/${id}`);

export const verifyOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.verifyOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.verifyOTP.response>>('/auth/verify-otp', data);

export const issueOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.issueOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.issueOTP.response>>('/auth/issue-otp', data);

export const registerPasskeyForExistingUser = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskeyForExistingUser.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskeyForExistingUser.response>>('/auth/register-passkey-existing-user', data);

export const initiatePasskeyRegistration = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.initiatePasskeyRegistration.body>) => 
    client.post<z.infer<typeof AuthSchema.initiatePasskeyRegistration.response>>('/auth/initiate-passkey-registration', data);

export const generateFarcasterJWT = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.generateFarcasterJWT.body>) => 
    client.post<z.infer<typeof AuthSchema.generateFarcasterJWT.response>>('/auth/generate-farcaster-jwt', data);

export const deleteFarcasterJWT = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof AuthSchema.deleteFarcasterJWT.response>>('/auth/delete-farcaster-jwt', {});

export type AuthApi = {
  generateChallenge: ReturnType<typeof generateChallenge>;
  registerPasskey: ReturnType<typeof registerPasskey>;
  authenticatePasskey: ReturnType<typeof authenticatePasskey>;
  findPasskeysForUser: ReturnType<typeof findPasskeysForUser>;
  removePasskey: ReturnType<typeof removePasskey>;
  verifyOTP: ReturnType<typeof verifyOTP>;
  issueOTP: ReturnType<typeof issueOTP>;
  registerPasskeyForExistingUser: ReturnType<typeof registerPasskeyForExistingUser>;
  initiatePasskeyRegistration: ReturnType<typeof initiatePasskeyRegistration>;
  generateFarcasterJWT: ReturnType<typeof generateFarcasterJWT>;
  deleteFarcasterJWT: ReturnType<typeof deleteFarcasterJWT>;
};