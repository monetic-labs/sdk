import axios from 'axios';
import type {
  GetPrefundedAccountBalanceResponse,
  CreatePrefundedAccountTransferBody,
  CreatePrefundedAccountTransferResponse,
  GetComplianceStatusResponse,
} from '@/api/_types/bridge';

class Bridge {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/bridge`;
  }

  async getPrefundedAccountBalance(): Promise<GetPrefundedAccountBalanceResponse> {
    const response = await axios.post<GetPrefundedAccountBalanceResponse>(
      `${this.apiUrl}/prefunded-account-balance`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async createPrefundedAccountTransfer(
    data: CreatePrefundedAccountTransferBody
  ): Promise<CreatePrefundedAccountTransferResponse> {
    const response = await axios.post<CreatePrefundedAccountTransferResponse>(
      `${this.apiUrl}/prefunded-account-transfer`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }

  async getComplianceStatus(): Promise<GetComplianceStatusResponse> {
    const response = await axios.get<GetComplianceStatusResponse>(
      `${this.apiUrl}/compliance`,
      { withCredentials: true }
    );
    return response.data;
  }
}

export default Bridge;
