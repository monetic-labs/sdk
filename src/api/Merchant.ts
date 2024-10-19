import axios from 'axios';
import type {
  ApiKeyCreateOutput,
  ApiKeyGetOutput,
  ApiKeyUpdateInput,
  MerchantCardGetInput,
  MerchantCardGetOutput,
  MerchantCardTransactionGetInput,
  MerchantCardTransactionGetOutput,
  MerchantCreateInput,
  MerchantCreateOutput,
  MerchantDisbursementCreateInput,
  MerchantDisbursementCreateOutput,
  MerchantDisbursementUpdateOutput,
  MerchantDisbursementUpdateInput,
  MerchantPhysicalCardCreateInput,
  MerchantPhysicalCardCreateOutput,
  MerchantRainCompanyCreateInput,
  MerchantRainCompanyCreateOutput,
  MerchantRainCompanyStatusOutput,
  MerchantRainCompanyUpdateInput,
  MerchantRainCompanyUpdateOutput,
  MerchantSettlementAccountGetOutput,
  MerchantSettlementAccountUpdateInput,
  MerchantUserCreateInput,
  MerchantUserGetOutput,
  MerchantUserUpdateInput,
  MerchantVirtualCardCreateInput,
  MerchantVirtualCardCreateOutput,
  MerchantVirtualCardDecryptOutput,
  MerchantDisbursementGetAllOutput,
  MerchantDisbursementGetAllInput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
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
      `${this.apiUrl}/`,
      data
    );
    return response.data;
  }

  async createApiKey({ apiKeyName }: { apiKeyName: string }) {
    const response = await axios.post<{ data: ApiKeyCreateOutput }>(
      `${this.apiUrl}/settlement/key/${apiKeyName}`,
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

  // RAIN CARDS

  async createPhysicalCard(body: MerchantPhysicalCardCreateInput) {
    const response = await axios.post<{
      data: MerchantPhysicalCardCreateOutput;
    }>(`${this.apiUrl}/cards/rain/physical`, body, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async createVirtualCard(body: MerchantVirtualCardCreateInput) {
    const response = await axios.post<{
      data: MerchantVirtualCardCreateOutput;
    }>(`${this.apiUrl}/cards/rain/virtual`, body, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async decryptVirtualCard(cardId: string) {
    const response = await axios.get<{
      data: MerchantVirtualCardDecryptOutput;
    }>(`${this.apiUrl}/cards/rain/${cardId}/decrypt`, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async getCards(queryParams: MerchantCardGetInput) {
    const response = await axios.get<{ data: MerchantCardGetOutput }>(
      `${this.apiUrl}/cards`,
      { params: queryParams, withCredentials: true }
    );
    return response.data.data;
  }

  async getCardTransactions(queryParams: MerchantCardTransactionGetInput) {
    const response = await axios.get<{
      data: MerchantCardTransactionGetOutput;
    }>(`${this.apiUrl}/cards/transactions`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data.data;
  }

  // RAIN COMPANY

  async applyCardCompany(body: MerchantRainCompanyCreateInput) {
    const response = await axios.post<{
      data: MerchantRainCompanyCreateOutput;
    }>(`${this.apiUrl}/company/rain`, body, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async reapplyCardCompany(body: MerchantRainCompanyCreateInput) {
    const response = await axios.put<{
      data: MerchantRainCompanyCreateOutput;
    }>(`${this.apiUrl}/company/rain`, body, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async updateCardCompany(body: MerchantRainCompanyUpdateInput) {
    const response = await axios.put<{
      data: MerchantRainCompanyUpdateOutput;
    }>(`${this.apiUrl}/company/rain`, body, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async uploadCardCompanyDocs(file: File) {
    const response = await axios.post<{
      data: { success: boolean };
    }>(`${this.apiUrl}/company/rain/upload`, file, {
      withCredentials: true,
    });
    return response.data.data.success;
  }

  async getCardCompanyStatus() {
    const response = await axios.get<{
      data: MerchantRainCompanyStatusOutput;
    }>(`${this.apiUrl}/company/rain/status`, { withCredentials: true });
    return response.data.data;
  }

  // USER SERVICE

  async getUsers() {
    const response = await axios.get<{
      data: MerchantUserGetOutput[];
    }>(`${this.apiUrl}/users`, { withCredentials: true });
    return response.data.data;
  }

  async createUser(data: MerchantUserCreateInput) {
    const response = await axios.post<{
      data: MerchantUserGetOutput;
    }>(`${this.apiUrl}/users`, data, { withCredentials: true });
    return response.data.data;
  }

  async updateUser(userId: string, data: MerchantUserUpdateInput) {
    const response = await axios.put<{
      data: MerchantUserGetOutput;
    }>(`${this.apiUrl}/users/${userId}`, data, { withCredentials: true });
    return response.data.data;
  }

  async deleteUser(userId: string) {
    const response = await axios.delete<{
      data: { success: boolean };
    }>(`${this.apiUrl}/users/${userId}`, { withCredentials: true });
    return response.data.data.success;
  }

  // DISBURSEMENT

  async initiateNewDisbursement(data: MerchantDisbursementCreateInput) {
    const response = await axios.post<{
      data: MerchantDisbursementCreateOutput;
    }>(`${this.apiUrl}/disbursement`, data, { withCredentials: true });
    return response.data.data;
  }

  async initiateExistingDisbursement(
    disbursementId: string,
    data: MerchantDisbursementUpdateInput
  ) {
    const response = await axios.put<{
      data: MerchantDisbursementUpdateOutput;
    }>(`${this.apiUrl}/disbursement/${disbursementId}`, data, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async getDisbursements(queryParams: MerchantDisbursementGetAllInput) {
    const response = await axios.get<{
      data: MerchantDisbursementGetAllOutput;
    }>(`${this.apiUrl}/disbursement`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data.data;
  }

  async getDisbursementContacts(
    queryParams: MerchantDisbursementContactGetAllInput
  ) {
    const response = await axios.get<{
      data: MerchantDisbursementContactGetOutput;
    }>(`${this.apiUrl}/disbursement/contacts`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data.data;
  }
}

export default Merchant;
