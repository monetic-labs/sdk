import { PylonApiClient } from '@/client';
import * as TransactionSchema from '@/schemas/transaction';
import { z } from 'zod';

export const PATH = (path: keyof typeof TransactionSchema.transactionEndpoints) => `${TransactionSchema.transactionEndpoints[path]}`;

export const processTransaction = (client: PylonApiClient) => 
  async (data: z.infer<typeof TransactionSchema.TransactionProcessInputSchema>): Promise<z.infer<typeof TransactionSchema.TransactionProcessOutputSchema>> => {
    // Validate input
    TransactionSchema.TransactionProcessInputSchema.parse(data);

    const response = await client.post<z.infer<typeof TransactionSchema.TransactionProcessOutputSchema>>(PATH('process'), data);

    // Validate output
    return TransactionSchema.TransactionProcessOutputSchema.parse(response);
  };

export const getTransactionStatus = (client: PylonApiClient) => 
  async (transactionId: string): Promise<z.infer<typeof TransactionSchema.TransactionStatusOutputSchema>> => {
    const response = await client.get<z.infer<typeof TransactionSchema.TransactionStatusOutputSchema>>(`/transaction/${transactionId}/status`);

    // Validate output
    return TransactionSchema.TransactionStatusOutputSchema.parse(response);
  };

// You might want to add other methods like:
// - listTransactions
// - refundTransaction
// - voidTransaction
// etc., depending on what the Pylon service offers

export type TransactionApi = ReturnType<typeof processTransaction> & ReturnType<typeof getTransactionStatus>;