import { PylonApiClient } from '@/client';
import * as BridgeSchema from "@/schemas/bridge";
import { z } from 'zod';

const PATH = (path: keyof BridgeSchema.BridgeEndpoints) => `${BridgeSchema.bridgeEndpoints[path]}`;

export const getPrefundedAccountBalance = (client: PylonApiClient) => 
  () => client.post<z.infer<typeof BridgeSchema.getPrefundedAccountBalance.response>>(PATH('prefundedAccountBalance'), {});

export const createPrefundedAccountTransfer = (client: PylonApiClient) => 
  (data: z.infer<typeof BridgeSchema.createPrefundedAccountTransfer.body>) => 
    client.post<z.infer<typeof BridgeSchema.createPrefundedAccountTransfer.response>>(PATH('prefundedAccountTransfer'), data);

export const processWebhook = (client: PylonApiClient) => 
  (data: z.infer<typeof BridgeSchema.processWebhook.body>) => 
    client.post<z.infer<typeof BridgeSchema.processWebhook.response>>(PATH('webhook'), data);

export type BridgeApi = {
  getPrefundedAccountBalance: ReturnType<typeof getPrefundedAccountBalance>;
  createPrefundedAccountTransfer: ReturnType<typeof createPrefundedAccountTransfer>;
  processWebhook: ReturnType<typeof processWebhook>;
};