import axios from 'axios';
import type {
  TransactionProcessInput,
  TransactionProcessOutput,
  TransactionStatusOutput,
} from '@/api/_types/transaction';

class Transaction {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/transaction`;
  }

  async processTransaction(
    data: TransactionProcessInput
  ): Promise<TransactionProcessOutput> {
    const response = await axios.post<TransactionProcessOutput>(
      `${this.apiUrl}/process`,
      data
    );
    return response.data;
  }

  // Bridge related method
  // NB: The output type may be incorrect
  async getTransactionStatus(
    transferId: string
  ): Promise<TransactionStatusOutput> {
    const response = await axios.get<TransactionStatusOutput>(
      `${this.apiUrl}/transfer/${transferId}`
    );
    return response.data;
  }
}

export default Transaction;
