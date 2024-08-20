import { PylonApiClient } from '@/client';
import { BridgeSchemaType } from '@/schemas/bridge';

export class BridgeApi {
  constructor(private client: PylonApiClient) {}

  async getPrefundedAccountBalance() {
    return this.client.post<BridgeSchemaType['getPrefundedAccountBalance']['response']>('/bridge/prefunded-account-balance', {});
  }

  async createPrefundedAccountTransfer(data: BridgeSchemaType['createPrefundedAccountTransfer']['body']) {
    return this.client.post<BridgeSchemaType['createPrefundedAccountTransfer']['response']>('/bridge/prefunded-account-transfer', data);
  }

  async processWebhook(data: BridgeSchemaType['processWebhook']['body']) {
    return this.client.post<BridgeSchemaType['processWebhook']['response']>('/bridge/webhook', data);
  }
}