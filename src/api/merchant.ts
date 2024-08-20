import { PylonApiClient } from '@/client';
import { z } from 'zod';

// Import the merchant schemas
import {
  MerchantCreateInput,
  MerchantCreateOutput,
  MerchantCreateOutputSchema,
  TransferStatusInput,
  TransferStatusOutput,
  TransferStatusOutputSchema,
} from '@/schemas/merchant';

export const createMerchant = (client: PylonApiClient) => 
  async (data: MerchantCreateInput): Promise<MerchantCreateOutput> => {
    const response = await client.post<z.infer<typeof MerchantCreateOutputSchema>>('/merchant/create', data);
    return {
      statusCode: response.statusCode,
      data: response.data
    };
  };

export const getTransferStatus = (client: PylonApiClient) => 
  async (data: TransferStatusInput): Promise<TransferStatusOutput> => {
    const response = await client.get<z.infer<typeof TransferStatusOutputSchema>>(`/merchant/transfer/${data.transferId}/status`);
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