import { PylonApiClient } from '@/client';
import { BRIDGE_ENDPOINTS, BridgeSchema, BridgeSchemaType } from '@/schemas/bridge';
import { z } from 'zod';

export const getPrefundedAccountBalance = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof BridgeSchema.getPrefundedAccountBalance.response>>(BRIDGE_ENDPOINTS.PREFUNDED_ACCOUNT_BALANCE, {});

export const createPrefundedAccountTransfer = (client: PylonApiClient) => 
  (data: BridgeSchemaType['createPrefundedAccountTransfer']['body']) => 
    client.post<z.infer<typeof BridgeSchema.createPrefundedAccountTransfer.response>>(BRIDGE_ENDPOINTS.PREFUNDED_ACCOUNT_TRANSFER, data);

export const processWebhook = (client: PylonApiClient) => 
  (data: BridgeSchemaType['processWebhook']['body']) => 
    client.post<z.infer<typeof BridgeSchema.processWebhook.response>>(BRIDGE_ENDPOINTS.WEBHOOK, data);

export type BridgeApi = {
  getPrefundedAccountBalance: ReturnType<typeof getPrefundedAccountBalance>;
  createPrefundedAccountTransfer: ReturnType<typeof createPrefundedAccountTransfer>;
  processWebhook: ReturnType<typeof processWebhook>;
};