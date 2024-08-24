import { PylonApiClient } from '@/client';
import { z } from 'zod';

// Import the merchant schemas
import * as MerchantSchema from '@/schemas/merchant';

export const PATH = (path: keyof typeof MerchantSchema.merchantEndpoints) => `${MerchantSchema.merchantEndpoints[path]}`;

export const createMerchant = (client: PylonApiClient) => 
  async (data: z.infer<typeof MerchantSchema.MerchantCreateInputSchema>): Promise<z.infer<typeof MerchantSchema.MerchantCreateOutputSchema>> => {
    const response = await client.post<z.infer<typeof MerchantSchema.MerchantCreateOutputSchema>>(PATH('create'), data);
    return {
      statusCode: response.statusCode,
      data: response.data
    };
  };

export const getTransferStatus = (client: PylonApiClient) => 
  async (data: z.infer<typeof MerchantSchema.TransferStatusInputSchema>): Promise<z.infer<typeof MerchantSchema.TransferStatusOutputSchema>> => {
    const response = await client.get<z.infer<typeof MerchantSchema.TransferStatusOutputSchema>>(`${PATH('transferStatus')}/${data.transferId}/status`);
    return {
      statusCode: response.statusCode,
      data: response.data
    };
  };

// You can add more merchant-related API functions here

export type MerchantApi = {
  createMerchant: ReturnType<typeof createMerchant>;
  getTransferStatus: ReturnType<typeof getTransferStatus>;
  // Add other merchant API function types here
};