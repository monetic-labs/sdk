import axios from 'axios';
import type {
  MerchantCreateInput,
  MerchantCreateOutput,
} from '@/api/_types/merchant';

class Merchant {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/merchant`;
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
}

export default Merchant;
