import { PylonApiClient } from '@/client';
import * as AuthSchema from "@/schemas/auth";
import { z } from 'zod';

const PATH = (path: keyof AuthSchema.AuthEndpoints) => `${AuthSchema.AUTH_ENDPOINTS.DIR}${AuthSchema.AUTH_ENDPOINTS[path]}`;

export const generateChallenge = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.generateChallenge.response>>(PATH('CHALLENGE'));

export const registerPasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskey.response>>(PATH('PASSKEY_REGISTER'), data);

export const authenticatePasskey = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.authenticatePasskey.body>) => 
    client.post<z.infer<typeof AuthSchema.authenticatePasskey.response>>(PATH('PASSKEY_AUTHENTICATE'), data);

export const findPasskeysForUser = (client: PylonApiClient) => 
  () => client.get<z.infer<typeof AuthSchema.findPasskeysForUser.response>>(PATH('PASSKEY_LIST'));

export const removePasskey = (client: PylonApiClient) => 
  (id: number) => client.delete<z.infer<typeof AuthSchema.removePasskey.response>>(PATH('PASSKEY_REMOVE') + `/${id}`);

export const verifyOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.verifyOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.verifyOTP.response>>(PATH('OTP_VERIFY'), data);

export const issueOTP = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.issueOTP.body>) => 
    client.post<z.infer<typeof AuthSchema.issueOTP.response>>(PATH('OTP_ISSUE'), data);

export const registerPasskeyForExistingUser = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.registerPasskeyForExistingUser.body>) => 
    client.post<z.infer<typeof AuthSchema.registerPasskeyForExistingUser.response>>(PATH('PASSKEY_ADD'), data);

export const initiatePasskeyRegistration = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.initiatePasskeyRegistration.body>) => 
    client.post<z.infer<typeof AuthSchema.initiatePasskeyRegistration.response>>(PATH('PASSKEY_ADD_TOKEN'), data);

export const generateFarcasterJWT = (client: PylonApiClient) => 
  (data: z.infer<typeof AuthSchema.generateFarcasterJWT.body>) => 
    client.post<z.infer<typeof AuthSchema.generateFarcasterJWT.response>>(PATH('JWT_GENERATE'), data);

export const deleteFarcasterJWT = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof AuthSchema.deleteFarcasterJWT.response>>(PATH('JWT_DELETE'), {});

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