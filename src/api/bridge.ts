import { PylonApiClient } from '@/client';
import { BridgeSchema, BridgeSchemaType } from '@/schemas/bridge';
import { z } from 'zod';

export const getPrefundedAccountBalance = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof BridgeSchema.getPrefundedAccountBalance.response>>('/bridge/prefunded-account-balance', {});

export const createPrefundedAccountTransfer = (client: PylonApiClient) => 
  (data: BridgeSchemaType['createPrefundedAccountTransfer']['body']) => 
    client.post<z.infer<typeof BridgeSchema.createPrefundedAccountTransfer.response>>('/bridge/prefunded-account-transfer', data);

export const processWebhook = (client: PylonApiClient) => 
  (data: BridgeSchemaType['processWebhook']['body']) => 
    client.post<z.infer<typeof BridgeSchema.processWebhook.response>>('/bridge/webhook', data);

export type BridgeApi = {
  getPrefundedAccountBalance: ReturnType<typeof getPrefundedAccountBalance>;
  createPrefundedAccountTransfer: ReturnType<typeof createPrefundedAccountTransfer>;
  processWebhook: ReturnType<typeof processWebhook>;
};