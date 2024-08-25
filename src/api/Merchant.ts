import axios from 'axios';
import type {
  MerchantCreateInput,
  MerchantCreateOutput,
  TransferStatusInput,
  TransferStatusOutput,
} from '@/api/_types/merchant';

class Merchant {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/merchant`;
  }

  async createMerchant(
    data: MerchantCreateInput
  ): Promise<MerchantCreateOutput> {
    const response = await axios.post<MerchantCreateOutput>(
      `${this.apiUrl}/create`,
      data
    );
    return response.data;
  }

  async getTransferStatus(
    data: TransferStatusInput
  ): Promise<TransferStatusOutput> {
    const response = await axios.get<TransferStatusOutput>(
      `${this.apiUrl}/transfer/${data.transferId}/status`
    );
    return response.data;
  }
}

export default Merchant;
