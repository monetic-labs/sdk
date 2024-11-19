import axios from 'axios';
import type {
  AccessTokenResponse,
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

  async initiateLoginOTP(data: IssueOTP): Promise<{
    statusCode: number;
    data: { message: string };
  }> {
    const response = await axios.post<{
      statusCode: number;
      data: { message: string };
    }>(`${this.apiUrl}/login/initiate`, data);
    return response.data;
  }

  async verifyLoginOTP(data: VerifyOTP): Promise<{
    statusCode: number;
    data: { message: string };
  }> {
    const response = await axios.post<{
      statusCode: number;
      data: { message: string };
    }>(`${this.apiUrl}/login/verify`, data, { withCredentials: true });
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
