import axios from 'axios';
import type {
  OnRampProcessInput,
  OnRampProcessOutput,
} from '@/api/_types/onramp';

class Onramp {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/onramp`;
  }

  async processOnRamp(
    data: OnRampProcessInput,
    apiToken: string
  ): Promise<OnRampProcessOutput> {
    const response = await axios.post<OnRampProcessOutput>(
      `${this.apiUrl}/`,
      data,
      {
        headers: {
          'x-api-key': apiToken,
        },
      }
    );
    return response.data;
  }
}

export default Onramp;
