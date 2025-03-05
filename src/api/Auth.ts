import axios from 'axios';
import type {
  AccessTokenResponse,
  IssueOTP,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
  GenerateChallengeResponse,
  RegisterPasskeyResponse,
  RegisterPasskeyInput,
  AuthenticatePasskeyInput,
  AuthenticatePasskeyResponse,
  IssueInviteInput,
  IssueInviteResponse,
  GetInviteResponse,
  RedeemInviteInput,
  RedeemInviteResponse,
  PasskeyRegistrationOptionsResponse,
  Passkey,
} from '@/api/_types/auth';

class Auth {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/auth`;
  }

  // PASSKEY

  async generatePasskeyChallenge(): Promise<GenerateChallengeResponse> {
    const response = await axios.get<{ data: GenerateChallengeResponse }>(
      `${this.apiUrl}/passkey/challenge`
    );
    return response.data.data;
  }

  async getPasskeyRegistrationOptions(
    email: string
  ): Promise<PasskeyRegistrationOptionsResponse> {
    const response = await axios.get<{
      data: PasskeyRegistrationOptionsResponse;
    }>(`${this.apiUrl}/passkey/options?email=${encodeURIComponent(email)}`);
    return response.data.data;
  }

  async getPasskeys(email: string): Promise<Passkey[]> {
    const response = await axios.get<{
      data: Passkey[];
    }>(`${this.apiUrl}/passkey?email=${encodeURIComponent(email)}`);
    return response.data.data;
  }

  async registerPasskey(
    data: RegisterPasskeyInput
  ): Promise<RegisterPasskeyResponse> {
    const response = await axios.post<{ data: RegisterPasskeyResponse }>(
      `${this.apiUrl}/passkey/register`,
      data
    );
    return response.data.data;
  }

  async authenticatePasskey(data: AuthenticatePasskeyInput) {
    const response = await axios.post<{ data: AuthenticatePasskeyResponse }>(
      `${this.apiUrl}/passkey/login`,
      data,
      { withCredentials: true }
    );
    return response.data.data;
  }

  // SERVICES

  async generateAccessToken(): Promise<AccessTokenResponse> {
    const response = await axios.get<AccessTokenResponse>(`${this.apiUrl}/jwt`);
    return response.data;
  }

  async logout() {
    const response = await axios.post<MessageResponse>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  // OTP

  async issueOTP(data: IssueOTP): Promise<{
    statusCode: number;
    data: { message: string };
  }> {
    const response = await axios.post<{
      statusCode: number;
      data: { message: string };
    }>(`${this.apiUrl}/login/initiate`, data);
    return response.data;
  }

  async verifyOTP(data: VerifyOTP): Promise<{
    statusCode: number;
    data: { message: string };
  }> {
    const response = await axios.post<{
      statusCode: number;
      data: { message: string };
    }>(`${this.apiUrl}/login/verify`, data, { withCredentials: true });
    return response.data;
  }

  // NEYNAR

  async generateFarcasterJWT(data: FarcasterJWTData): Promise<MessageResponse> {
    const response = await axios.post<MessageResponse>(
      `${this.apiUrl}/jwt`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }

  async deleteFarcasterJWT(): Promise<MessageResponse> {
    const response = await axios.delete<MessageResponse>(`${this.apiUrl}/jwt`, {
      withCredentials: true,
    });
    return response.data;
  }

  // INVITE

  async issueInvite(data: IssueInviteInput): Promise<IssueInviteResponse> {
    const response = await axios.post<{ data: IssueInviteResponse }>(
      `${this.apiUrl}/invite`,
      data,
      { withCredentials: true }
    );
    return response.data.data;
  }

  async getInvite(bearerToken: string): Promise<GetInviteResponse> {
    const response = await axios.get<{ data: GetInviteResponse }>(
      `${this.apiUrl}/invite`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return response.data.data;
  }

  async redeemInvite(
    bearerToken: string,
    data: RedeemInviteInput
  ): Promise<RedeemInviteResponse> {
    const response = await axios.post<{ data: RedeemInviteResponse }>(
      `${this.apiUrl}/invite/redeem`,
      data,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return response.data.data;
  }

  async cancelInvite(inviteId: string): Promise<boolean> {
    const response = await axios.delete<{ data: { success: boolean } }>(
      `${this.apiUrl}/invite/${inviteId}`,
      { withCredentials: true }
    );
    return response.data.data.success;
  }

  // MAGIC LINK

  async issueMagicLink(email: string): Promise<MessageResponse> {
    const response = await axios.post<{ data: MessageResponse }>(
      `${this.apiUrl}/magic_link`,
      { email }
    );
    return response.data.data;
  }

  async verifyMagicLink(token: string): Promise<MessageResponse> {
    const response = await axios.post<{ data: MessageResponse }>(
      `${this.apiUrl}/magic_link/verify?token=${token}`,
      {},
      { withCredentials: true }
    );
    return response.data.data;
  }

  async exchangeMagicLinkToken(token: string): Promise<MessageResponse> {
    const response = await axios.post<{ data: MessageResponse }>(
      `${this.apiUrl}/magic_link/exchange`,
      { token },
      { withCredentials: true }
    );
    return response.data.data;
  }
}

export default Auth;
