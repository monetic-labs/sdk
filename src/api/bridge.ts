import axios from 'axios';
import {
  GetPrefundedAccountBalanceResponse,
  CreatePrefundedAccountTransferBody,
  CreatePrefundedAccountTransferResponse,
} from '@/api/_types/bridge';

class Bridge {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/bridge`;
  }

  async getPrefundedAccountBalance(): Promise<GetPrefundedAccountBalanceResponse> {
    const response = await axios.post<GetPrefundedAccountBalanceResponse>(
      `${this.apiUrl}/prefunded-account-balance`,
      {}
    );
    return response.data;
  }

  async createPrefundedAccountTransfer(
    data: CreatePrefundedAccountTransferBody
  ): Promise<CreatePrefundedAccountTransferResponse> {
    const response = await axios.post<CreatePrefundedAccountTransferResponse>(
      `${this.apiUrl}/prefunded-account-transfer`,
      data
    );
    return response.data;
  }
}

export default Bridge;
