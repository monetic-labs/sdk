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
  MerchantPhysicalCardCreateInput,
  MerchantPhysicalCardCreateOutput,
  MerchantRainCompanyCreateInput,
  MerchantRainCompanyCreateOutput,
  MerchantRainCompanyStatusOutput,
  MerchantRainCompanyUpdateInput,
  MerchantRainCompanyUpdateOutput,
  MerchantAccountGetOutput,
  MerchantAccountUpdateInput,
  MerchantUserCreateInput,
  MerchantUserGetOutput,
  MerchantUserUpdateInput,
  MerchantVirtualCardCreateInput,
  MerchantVirtualCardCreateOutput,
  MerchantVirtualCardDecryptOutput,
  UpdateMerchantCardDataInput,
  UpdateMerchantCardDataOutput,
  UpdateMerchantCardPinInput,
  UpdateMerchantCardPinOutput,
  GetMerchantCardPinInput,
  GetMerchantCardPinOutput,
  MerchantTelegramMessageCreateInput,
  MerchantFileUploadInput,
  MerchantUserGetByIdOutput,
  MerchantAccountCreateInput,
  MerchantRainCardBalanceOutput,
  MerchantAccountRainCardWithdrawalRequestInput,
  MerchantAccountRainCardWithdrawalRequestOutput,
  MerchantChatEvent,
} from '@/api/_types/merchant';
import type {
  MerchantDisbursementCreateInput,
  MerchantDisbursementCreateOutput,
  MerchantDisbursementUpdateOutput,
  MerchantDisbursementUpdateInput,
  MerchantDisbursementEventsOutput,
  MerchantDisbursementEventsInput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
} from '@/api/_types/disbursement';
import { EventSourcePolyfill } from 'event-source-polyfill';

class Merchant {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/merchant`;
  }
  async createMerchant(
    token: string,
    data: MerchantCreateInput
  ): Promise<MerchantCreateOutput> {
    const response = await axios.post<MerchantCreateOutput>(
      `${this.apiUrl}?token=${token}`,
      data,
      { withCredentials: true }
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

  async getAccounts() {
    const response = await axios.get<{
      data: MerchantAccountGetOutput[];
    }>(`${this.apiUrl}/accounts`, { withCredentials: true });
    return response.data.data;
  }

  async createAccount(data: MerchantAccountCreateInput) {
    const response = await axios.post<{
      data: MerchantAccountGetOutput;
    }>(`${this.apiUrl}/accounts`, data, { withCredentials: true });
    return response.data.data;
  }

  async updateAccount(accountId: string, data: MerchantAccountUpdateInput) {
    const response = await axios.put<{
      data: MerchantAccountGetOutput;
    }>(`${this.apiUrl}/accounts/${accountId}`, data, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async getSettlementAccount() {
    const response = await axios.get<{
      data: MerchantAccountGetOutput[];
    }>(`${this.apiUrl}/accounts`, { withCredentials: true });
    return response.data.data.find((account) => account.isSettlement);
  }

  async setSettlementAccount(accountId: string) {
    const response = await axios.put<{ data: { success: boolean } }>(
      `${this.apiUrl}/accounts/${accountId}/settlement`,
      {},
      { withCredentials: true }
    );
    return response.data.data.success;
  }

  async requestWithdrawalSignatureForRainAccount(
    data: MerchantAccountRainCardWithdrawalRequestInput
  ) {
    const response = await axios.post<{
      data: MerchantAccountRainCardWithdrawalRequestOutput;
    }>(`${this.apiUrl}/accounts/withdrawal/signature`, data, {
      withCredentials: true,
    });
    return response.data.data;
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

  async updateRainCard(body: UpdateMerchantCardDataInput) {
    const payloadBody = {} as Partial<UpdateMerchantCardDataInput>;
    if (body.status) {
      payloadBody.status = body.status;
    }
    if (body.limit) {
      payloadBody.limit = body.limit;
    }
    const response = await axios.put<{ data: UpdateMerchantCardDataOutput }>(
      `${this.apiUrl}/cards/rain/${body.cardId}`,
      { ...payloadBody },
      { withCredentials: true }
    );
    return response.data.data;
  }
  async updateRainCardPin(body: UpdateMerchantCardPinInput) {
    const response = await axios.put<{ data: UpdateMerchantCardPinOutput }>(
      `${this.apiUrl}/cards/rain/${body.cardId}/pin`,
      { pin: body.pin },
      { withCredentials: true }
    );
    return response.data.data;
  }

  async getRainCardPin(body: GetMerchantCardPinInput) {
    const response = await axios.get<{ data: GetMerchantCardPinOutput }>(
      `${this.apiUrl}/cards/rain/${body.cardId}/pin`,
      { withCredentials: true }
    );
    return response.data.data;
  }

  async getRainCardBalance() {
    const response = await axios.get<{
      data: MerchantRainCardBalanceOutput;
    }>(`${this.apiUrl}/cards/rain/balance`, { withCredentials: true });
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

  async getUserById() {
    const response = await axios.get<{
      data: MerchantUserGetByIdOutput;
    }>(`${this.apiUrl}/users/me`, { withCredentials: true });
    return response.data.data;
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

  async getDisbursementEvents(queryParams: MerchantDisbursementEventsInput) {
    const response = await axios.get<{
      data: MerchantDisbursementEventsOutput;
    }>(`${this.apiUrl}/disbursement/events`, {
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

  // TELEGRAM

  async createTelegramMessage(body: MerchantTelegramMessageCreateInput) {
    const response = await axios.post<{
      data: { success: boolean };
    }>(`${this.apiUrl}/chat/telegram`, body, { withCredentials: true });
    return response.data.data.success;
  }

  async getFileUploadUrl(body: MerchantFileUploadInput) {
    const response = await axios.post<{
      data: {
        uploadUrl: string;
        accessUrl: string;
      };
    }>(`${this.apiUrl}/chat/file/upload`, body, { withCredentials: true });
    return response.data.data;
  }

  async getChatEvents(callback: (data: MerchantChatEvent) => void) {
    const eventSource = new EventSourcePolyfill(`${this.apiUrl}/chat/events`, {
      heartbeatTimeout: 4 * 60 * 60 * 1000, // 4 hours
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data: MerchantChatEvent = JSON.parse(event.data);
      callback(data);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Return a function to close the connection when needed
    return () => {
      eventSource.close();
    };
  }
}

export default Merchant;
