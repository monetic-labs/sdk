import { PylonApiClient } from '@/client';
import * as AuthSchema from "@/schemas/auth";
import { z } from 'zod';

export const generateChallenge = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.generateChallenge.response>>(AuthSchema.AUTH_ENDPOINTS.CHALLENGE);

export const registerPasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskey.response>>(AuthSchema.AUTH_ENDPOINTS.PASSKEY_REGISTER, data);

export const authenticatePasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.authenticatePasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.authenticatePasskey.response>>(AuthSchema.AUTH_ENDPOINTS.PASSKEY_AUTHENTICATE, data);

export const findPasskeysForUser = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.findPasskeysForUser.response>>(AuthSchema.AUTH_ENDPOINTS.PASSKEY_LIST);

export const removePasskey = (client: PylonApiClient) => 
    (id: number) => client.delete<z.infer<typeof AuthSchema.removePasskey.response>>(`${AuthSchema.AUTH_ENDPOINTS.PASSKEY_REMOVE}/${id}`);

export const verifyOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.verifyOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.verifyOTP.response>>(AuthSchema.AUTH_ENDPOINTS.OTP_VERIFY, data);

export const issueOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.issueOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.issueOTP.response>>(AuthSchema.AUTH_ENDPOINTS.OTP_ISSUE, data);

export const registerPasskeyForExistingUser = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskeyForExistingUser.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskeyForExistingUser.response>>(AuthSchema.AUTH_ENDPOINTS.PASSKEY_ADD, data);

export const initiatePasskeyRegistration = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.initiatePasskeyRegistration.body>) => 
    client.post<z.infer<typeof AuthSchema.initiatePasskeyRegistration.response>>(AuthSchema.AUTH_ENDPOINTS.PASSKEY_ADD_TOKEN, data);

export const generateFarcasterJWT = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.generateFarcasterJWT.body>) => 
    client.post<z.infer<typeof AuthSchema.generateFarcasterJWT.response>>(AuthSchema.AUTH_ENDPOINTS.JWT_GENERATE, data);

export const deleteFarcasterJWT = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof AuthSchema.deleteFarcasterJWT.response>>(AuthSchema.AUTH_ENDPOINTS.JWT_DELETE, {});

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