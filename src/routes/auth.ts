// src/routes/auth.ts
import { PylonApiClient } from '@/client';
import { AuthSchema, AuthSchemaType } from '@/schemas/auth';

export class AuthApi {
  constructor(private client: PylonApiClient) {}

  async generateChallenge() {
    return this.client.get<AuthSchemaType['generateChallenge']['response']>('/auth/challenge');
  }

  async registerPasskey(data: AuthSchemaType['registerPasskey']['body']) {
    return this.client.post<AuthSchemaType['registerPasskey']['response']>('/auth/register-passkey', data);
  }

  async authenticatePasskey(data: AuthSchemaType['authenticatePasskey']['body']) {
    return this.client.post<AuthSchemaType['authenticatePasskey']['response']>('/auth/authenticate-passkey', data);
  }

  async initiatePasskeyRegistration(data: AuthSchemaType['initiatePasskeyRegistration']['body']) {
    return this.client.post<AuthSchemaType['initiatePasskeyRegistration']['response']>('/auth/initiate-passkey-registration', data);
  }

  async registerPasskeyForExistingUser(data: AuthSchemaType['registerPasskeyForExistingUser']['body']) {
    return this.client.post<AuthSchemaType['registerPasskeyForExistingUser']['response']>('/auth/register-passkey-existing-user', data);
  }

  async removePasskey(id: number) {
    return this.client.delete<AuthSchemaType['removePasskey']['response']>(`/auth/passkey/${id}`);
  }

  async findPasskeysForUser() {
    return this.client.get<AuthSchemaType['findPasskeysForUser']['response']>('/auth/passkeys');
  }

  async issueOTP(data: AuthSchemaType['issueOTP']['body']) {
    return this.client.post<AuthSchemaType['issueOTP']['response']>('/auth/issue-otp', data);
  }

  async verifyOTP(data: AuthSchemaType['verifyOTP']['body']) {
    return this.client.post<AuthSchemaType['verifyOTP']['response']>('/auth/verify-otp', data);
  }

  async generateFarcasterJWT(data: AuthSchemaType['generateFarcasterJWT']['body']) {
    const transformedData = AuthSchema.generateFarcasterJWT.body.parse(data);
    return this.client.post<AuthSchemaType['generateFarcasterJWT']['response']>('/auth/generate-farcaster-jwt', transformedData);
  }

  async deleteFarcasterJWT() {
    return this.client.post<AuthSchemaType['deleteFarcasterJWT']['response']>('/auth/delete-farcaster-jwt', {});
  }
}