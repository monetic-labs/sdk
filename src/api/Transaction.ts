import axios from 'axios';
import type {
  TransactionListOutput,
  TransactionProcessInput,
  TransactionProcessOutput,
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

  async getTransactionList(callback: (data: TransactionListOutput) => void) {
    const eventSource = new EventSourcePolyfill(`${this.apiUrl}/list`, {
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
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
}

export default Transaction;
