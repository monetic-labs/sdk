import { PylonApiClient } from '@/client';
import { BridgeSchemaType } from '@/schemas/bridge';


export const getPrefundedAccountBalance = (client: PylonApiClient) => 
  () => client.post<BridgeSchemaType['getPrefundedAccountBalance']['response']>('/bridge/prefunded-account-balance', {});

export const createPrefundedAccountTransfer = (client: PylonApiClient) => 
  (data: BridgeSchemaType['createPrefundedAccountTransfer']['body']) => 
    client.post<BridgeSchemaType['createPrefundedAccountTransfer']['response']>('/bridge/prefunded-account-transfer', data);

export const processWebhook = (client: PylonApiClient) => 
  (data: BridgeSchemaType['processWebhook']['body']) => 
    client.post<BridgeSchemaType['processWebhook']['response']>('/bridge/webhook', data);
