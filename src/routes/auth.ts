// src/routes/auth.ts
import { PylonApiClient } from '@/client';
import * as AuthSchema from "@/schemas/auth";
import { z } from 'zod';

export class AuthApi {
  constructor(private client: PylonApiClient) {}

  async generateChallenge() {
    return this.client.get<z.infer<typeof AuthSchema.generateChallenge.response>>('/auth/challenge');
  }

  async registerPasskey(data: z.infer<typeof AuthSchema.registerPasskey.body>) {
    return this.client.post<z.infer<typeof AuthSchema.registerPasskey.response>>('/auth/register-passkey', data);
  }

  async authenticatePasskey(data: z.infer<typeof AuthSchema.authenticatePasskey.body>) {
    return this.client.post<z.infer<typeof AuthSchema.authenticatePasskey.response>>('/auth/authenticate-passkey', data);
  }

  async initiatePasskeyRegistration(data: z.infer<typeof AuthSchema.initiatePasskeyRegistration.body>) {
    return this.client.post<z.infer<typeof AuthSchema.initiatePasskeyRegistration.response>>('/auth/initiate-passkey-registration', data);
  }

  async registerPasskeyForExistingUser(data: z.infer<typeof AuthSchema.registerPasskeyForExistingUser.body>) {
    return this.client.post<z.infer<typeof AuthSchema.registerPasskeyForExistingUser.response>>('/auth/register-passkey-existing-user', data);
  }

  async removePasskey(id: number) {
    return this.client.delete<z.infer<typeof AuthSchema.removePasskey.response>>(`/auth/passkey/${id}`);
  }

  async findPasskeysForUser() {
    return this.client.get<z.infer<typeof AuthSchema.findPasskeysForUser.response>>('/auth/passkeys');
  }

  async issueOTP(data: z.infer<typeof AuthSchema.issueOTP.body>) {
    return this.client.post<z.infer<typeof AuthSchema.issueOTP.response>>('/auth/issue-otp', data);
  }

  async verifyOTP(data: z.infer<typeof AuthSchema.verifyOTP.body>) {
    return this.client.post<z.infer<typeof AuthSchema.verifyOTP.response>>('/auth/verify-otp', data);
  }

  async generateFarcasterJWT(data: z.infer<typeof AuthSchema.generateFarcasterJWT.body>) {
    const transformedData = AuthSchema.generateFarcasterJWT.body.parse(data);
    return this.client.post<z.infer<typeof AuthSchema.generateFarcasterJWT.response>>('/auth/generate-farcaster-jwt', transformedData);
  }

  async deleteFarcasterJWT() {
    return this.client.post<z.infer<typeof AuthSchema.deleteFarcasterJWT.response>>('/auth/delete-farcaster-jwt', {});
  }
}