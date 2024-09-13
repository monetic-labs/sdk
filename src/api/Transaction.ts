import axios from 'axios';
import type {
  TransactionListOutput,
  TransactionProcessInput,
  TransactionProcessOutput,
  TransactionProcessRefundInput,
  TransactionProcessRefundOutput,
  TransactionStatusOutput,
} from '@/api/_types/transaction';
import { EventSourcePolyfill } from 'event-source-polyfill';

class Transaction {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/transaction`;
  }

  async processTransaction(
    data: TransactionProcessInput
  ): Promise<TransactionProcessOutput> {
    const response = await axios.post<TransactionProcessOutput>(
      `${this.apiUrl}/process?paymentProcessor=${data.paymentProcessor}`,
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

  async getTransactionList(callback: (data: TransactionListOutput) => void) {
    const eventSource = new EventSourcePolyfill(`${this.apiUrl}/list`, {
      heartbeatTimeout: 4 * 60 * 60 * 1000, // 4 hours
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data: TransactionListOutput = JSON.parse(event.data);
      callback(data);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close(); // We may not need to close the connection here
    };

    // Return a function to close the connection when needed
    return () => {
      eventSource.close();
    };
  }

  async processRefund(data: TransactionProcessRefundInput) {
    const response = await axios.post<TransactionProcessRefundOutput>(
      `${this.apiUrl}/${data.transactionId}/refund`,
      {
        amount: data.amount,
        currency: data.currency,
        ...(data.reference && { reference: data.reference }),
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
}

export default Transaction;
