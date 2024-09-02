import axios from 'axios';
import type {
  AccessTokenResponse,
  ChallengeResponse,
  PasskeyRegistrationData,
  PasskeyRegistrationResponse,
  AuthenticatePasskeyData,
  InitiatePasskeyRegistrationData,
  RegisterPasskeyForExistingUserData,
  PasskeyListResponse,
  IssueOTP,
  FarcasterJWTData,
  MessageResponse,
  VerifyOTP,
} from '@/api/_types/auth';

class Auth {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/auth`;
  }

  async generateAccessToken(): Promise<AccessTokenResponse> {
    const response = await axios.get<AccessTokenResponse>(`${this.apiUrl}/jwt`);
    return response.data;
  }

  async initiateLoginOTP(data: IssueOTP): Promise<boolean> {
    const response = await axios.post<VerifyOTP>(
      `${this.apiUrl}/login/initiate`,
      data
    );
    return response.status === 200;
  }

  async verifyLoginOTP(data: VerifyOTP): Promise<boolean> {
    const response = await axios.post<VerifyOTP>(
      `${this.apiUrl}/login/verify`,
      data
    );
    return response.status === 200;
  }

  async generateChallenge(): Promise<ChallengeResponse> {
    const response = await axios.get<ChallengeResponse>(
      `${this.apiUrl}/challenge`
    );
    return response.data;
  }

  async registerPasskey(
    data: PasskeyRegistrationData
  ): Promise<PasskeyRegistrationResponse> {
    const response = await axios.post<PasskeyRegistrationResponse>(
      `${this.apiUrl}/passkey/register`,
      data
    );
    return response.data;
  }

  async authenticatePasskey(
    data: AuthenticatePasskeyData
  ): Promise<PasskeyRegistrationResponse> {
    const response = await axios.post<PasskeyRegistrationResponse>(
      `${this.apiUrl}/passkey`,
      data
    );
    return response.data;
  }

  async findPasskeysForUser(): Promise<PasskeyListResponse> {
    const response = await axios.get<PasskeyListResponse>(
      `${this.apiUrl}/passkey`
    );
    return response.data;
  }

  async removePasskey(id: number): Promise<MessageResponse> {
    const response = await axios.delete<MessageResponse>(
      `${this.apiUrl}/passkey/${id}`
    );
    return response.data;
  }

  async issueOTP(data: IssueOTP): Promise<IssueOTP> {
    const response = await axios.post<IssueOTP>(
      `${this.apiUrl}/otp/issue`,
      data
    );
    return response.data;
  }

  async verifyOTP(data: VerifyOTP): Promise<VerifyOTP> {
    const response = await axios.post<VerifyOTP>(
      `${this.apiUrl}/otp/verify`,
      data
    );
    return response.data;
  }

  async registerPasskeyForExistingUser(
    data: RegisterPasskeyForExistingUserData
  ): Promise<MessageResponse> {
    const response = await axios.post<MessageResponse>(
      `${this.apiUrl}/add`,
      data
    );
    return response.data;
  }

  async initiatePasskeyRegistration(
    data: InitiatePasskeyRegistrationData
  ): Promise<MessageResponse> {
    const response = await axios.post<MessageResponse>(
      `${this.apiUrl}/add/send-token`,
      data
    );
    return response.data;
  }

  async generateFarcasterJWT(data: FarcasterJWTData): Promise<MessageResponse> {
    console.log('SDK before gen JWT response', data);
    const response = await axios.post<MessageResponse>(
      `${this.apiUrl}/jwt`,
      data,
      { withCredentials: true }
    );
    console.log('generateFarcasterJWT in SDK response', response.data);
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
