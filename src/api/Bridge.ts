import axios from 'axios';
import type {
  GetPrefundedAccountBalanceResponse,
  CreatePrefundedAccountTransferBody,
  CreatePrefundedAccountTransferResponse,
  GetComplianceStatusResponse,
  GetVirtualAccountResponse,
  CreateVirtualAccountBody,
  UpdateVirtualAccountBody,
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
    const response = await axios.get<{ data: GetComplianceStatusResponse }>(
      `${this.apiUrl}/compliance`,
      { withCredentials: true }
    );
    return response.data.data;
  }

  // VIRTUAL ACCOUNTS

  async getVirtualAccount(): Promise<GetVirtualAccountResponse> {
    const response = await axios.get(`${this.apiUrl}/virtual_accounts`, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async createVirtualAccount(
    data: CreateVirtualAccountBody
  ): Promise<GetVirtualAccountResponse> {
    const response = await axios.post<GetVirtualAccountResponse>(
      `${this.apiUrl}/virtual_accounts`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }

  async updateVirtualAccount(
    data: UpdateVirtualAccountBody
  ): Promise<GetVirtualAccountResponse> {
    const response = await axios.put<GetVirtualAccountResponse>(
      `${this.apiUrl}/virtual_accounts`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }
}

export default Bridge;
