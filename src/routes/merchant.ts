import { PylonApiClient } from '@/client';
import {
  MerchantCreateInput,
  MerchantCreateInputSchema,
  MerchantCreateOutput,
  MerchantCreateOutputSchema,
  TransferStatusInput,
  TransferStatusInputSchema,
  TransferStatusOutput,
  TransferStatusOutputSchema,
} from '@/schemas/merchant';

export class MerchantApi {
  constructor(private client: PylonApiClient) {}

  async createMerchant(data: MerchantCreateInput): Promise<MerchantCreateOutput> {
    // Validate input
    MerchantCreateInputSchema.parse(data);

    const response = await this.client.post<MerchantCreateOutput>('/merchant/create', data);

    // Validate and return output
    return MerchantCreateOutputSchema.parse(response);
  }

  async getTransferStatus(data: TransferStatusInput): Promise<TransferStatusOutput> {
    // Validate input
    TransferStatusInputSchema.parse(data);

    const response = await this.client.get<TransferStatusOutput>(`/merchant/transfer/${data.transferId}/status`);

    // Validate and return output
    return TransferStatusOutputSchema.parse(response);
  }

  // Add other merchant-related methods as needed
}