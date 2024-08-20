import { PylonApiClient } from '@/client';
import {
  TransactionProcessInput,
  TransactionProcessInputSchema,
  TransactionProcessOutput,
  TransactionProcessOutputSchema,
  TransactionStatusOutput,
  TransactionStatusOutputSchema
} from '@/schemas/transaction';

export class TransactionApi {
  constructor(private client: PylonApiClient) {}

  async processTransaction(data: TransactionProcessInput): Promise<TransactionProcessOutput> {
    // Validate input
    TransactionProcessInputSchema.parse(data);

    const response = await this.client.post<TransactionProcessOutput>('/transaction/process', data);

    // Validate output
    return TransactionProcessOutputSchema.parse(response);
  }

  async getTransactionStatus(transactionId: string): Promise<TransactionStatusOutput> {
    const response = await this.client.get<TransactionStatusOutput>(`/transaction/${transactionId}/status`);

    // Validate output
    return TransactionStatusOutputSchema.parse(response);
  }

  // You might want to add other methods like:
  // - listTransactions
  // - refundTransaction
  // - voidTransaction
  // etc., depending on what the Pylon service offers
}