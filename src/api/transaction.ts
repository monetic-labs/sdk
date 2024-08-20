import { PylonApiClient } from '@/client';
import {
  TransactionProcessInput,
  TransactionProcessInputSchema,
  TransactionProcessOutput,
  TransactionProcessOutputSchema,
  TransactionStatusOutput,
  TransactionStatusOutputSchema
} from '@/schemas/transaction';

export const processTransaction = (client: PylonApiClient) => 
  async (data: TransactionProcessInput): Promise<TransactionProcessOutput> => {
    // Validate input
    TransactionProcessInputSchema.parse(data);

    const response = await client.post<TransactionProcessOutput>('/transaction/process', data);

    // Validate output
    return TransactionProcessOutputSchema.parse(response);
  };

export const getTransactionStatus = (client: PylonApiClient) => 
  async (transactionId: string): Promise<TransactionStatusOutput> => {
    const response = await client.get<TransactionStatusOutput>(`/transaction/${transactionId}/status`);

    // Validate output
    return TransactionStatusOutputSchema.parse(response);
  };

// You might want to add other methods like:
// - listTransactions
// - refundTransaction
// - voidTransaction
// etc., depending on what the Pylon service offers

export type TransactionApi = ReturnType<typeof processTransaction> & ReturnType<typeof getTransactionStatus>;