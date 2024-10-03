import axios from 'axios';
import type {
  ApiKeyCreateOutput,
  ApiKeyGetOutput,
  ApiKeyUpdateInput,
  MerchantCreateInput,
  MerchantCreateOutput,
  MerchantSettlementAccountGetOutput,
  MerchantSettlementAccountUpdateInput,
} from '@/api/_types/merchant';

class Merchant {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/merchant`;
  }

  async createMerchant(
    data: MerchantCreateInput
  ): Promise<MerchantCreateOutput> {
    const response = await axios.post<MerchantCreateOutput>(
      `${this.apiUrl}/create`,
      data
    );
    return response.data;
  }

  async createApiKey({ apiKeyName }: { apiKeyName: string }) {
    const response = await axios.post<{ data: ApiKeyCreateOutput }>(
      `${this.apiUrl}/settlement/key${apiKeyName}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async deleteApiKey(apiKey: string) {
    const response = await axios.delete<{ data: { success: boolean } }>(
      `${this.apiUrl}/settlement/key/${apiKey}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data.success;
  }

  async updateApiKey(apiKey: string, data: ApiKeyUpdateInput) {
    const response = await axios.put<{ data: { success: boolean } }>(
      `${this.apiUrl}/settlement/key/${apiKey}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.data.success;
  }

  async getApiKeys() {
    const response = await axios.get<{ data: ApiKeyGetOutput[] }>(
      `${this.apiUrl}/settlement/key`,
      { withCredentials: true }
    );
    return response.data.data;
  }

  async getSettlementAccount() {
    const response = await axios.get<{
      data: MerchantSettlementAccountGetOutput;
    }>(`${this.apiUrl}/settlement`, { withCredentials: true });
    return response.data.data;
  }

  async updateSettlementAccount(data: MerchantSettlementAccountUpdateInput) {
    const response = await axios.put<{ data: { success: boolean } }>(
      `${this.apiUrl}/settlement`,
      data,
      { withCredentials: true }
    );
    return response.data.data.success;
  }
}

export default Merchant;
