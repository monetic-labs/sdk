import axios from 'axios';
import type {
  RecoveryWalletGenerateInput,
  RecoveryWalletGenerateOutput,
  RecoveryWalletFetchOutput,
} from '@/api/_types/recovery';

class Recovery {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/recovery`;
  }

  async generateRecoveryWallets(data: RecoveryWalletGenerateInput[]) {
    const response = await axios.post<{
      data: RecoveryWalletGenerateOutput[];
    }>(`${this.apiUrl}/wallet/generate`, data, { withCredentials: true });
    return response.data.data;
  }

  async getRecoveryWallets() {
    const response = await axios.get<{
      data: RecoveryWalletFetchOutput[];
    }>(`${this.apiUrl}/wallet`, { withCredentials: true });
    return response.data.data;
  }

  async deleteRecoveryWallet(id: string) {
    const response = await axios.delete(`${this.apiUrl}/wallet/${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  }
}

export default Recovery;
