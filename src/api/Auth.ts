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

  // BACK OFFICE

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
}

export default Auth;
