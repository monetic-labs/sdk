import axios from 'axios';
import type {
  CreateOrderLinkInput,
  CreateOrderLinkOutput,
  DeleteOrderLinkOutput,
  GetOrderLinkOutput,
  GetOrderLinksOutput,
  TransactionListOutput,
  TransactionProcessInput,
  TransactionProcessOutput,
  TransactionProcessRefundInput,
  TransactionProcessRefundOutput,
  TransactionStatusOutput,
  TransactionListItem,
} from '@/api/_types/transaction';
import { TransactionSSEEventType as SSEEventType } from '@/api/_enums/transaction';
import { EventSourcePolyfill } from 'event-source-polyfill';
class Transaction {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/transaction`;
  }

  async processTransaction(
    data: TransactionProcessInput,
    bearerToken: string
  ): Promise<TransactionProcessOutput> {
    const response = await axios.post<TransactionProcessOutput>(
      `${this.apiUrl}/process?paymentProcessor=${data.paymentProcessor}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
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

    // Listener for the initial list of transactions
    eventSource.addEventListener(SSEEventType.INITIAL_LIST, (event) => {
      try {
        // Type assertion might be needed depending on MessageEvent typing
        const messageEvent = event as MessageEvent;
        // Parse data specifically expected for INITIAL_LIST
        const parsedData = JSON.parse(messageEvent.data);
        // Construct the specific output type
        const output: TransactionListOutput = {
          type: SSEEventType.INITIAL_LIST,
          data: parsedData, // Assuming parsedData matches the structure { transactions: [], meta: {} }
        };
        callback(output);
      } catch (error) {
        console.error(
          `Error parsing ${SSEEventType.INITIAL_LIST} event:`,
          error,
          event
        );
      }
    });

    // Listener for individual transaction updates
    eventSource.addEventListener(SSEEventType.TRANSACTION_UPDATED, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        // Parse data specifically expected for TRANSACTION_UPDATED
        const parsedData: TransactionListItem = JSON.parse(messageEvent.data);
        // Construct the specific output type
        const output: TransactionListOutput = {
          type: SSEEventType.TRANSACTION_UPDATED,
          data: parsedData,
        };
        callback(output);
      } catch (error) {
        console.error(
          `Error parsing ${SSEEventType.TRANSACTION_UPDATED} event:`,
          error,
          event
        );
      }
    });

    // Listener for keep-alive messages (if server sends a specific event type)
    // Example: Assuming server sends event: KEEP_ALIVE
    eventSource.addEventListener(SSEEventType.KEEP_ALIVE, () => {
      // console.log('Keep-alive received');
      // Often, no specific data processing is needed, but you might want to pass it on
      const output: TransactionListOutput = { type: SSEEventType.KEEP_ALIVE };
      callback(output);
    });

    // Optional: Listener for the 'connected' message if you need the connectionId client-side
    eventSource.addEventListener(SSEEventType.CONNECTED, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const connectionData = JSON.parse(messageEvent.data);
        console.log('SSE Connected, ID:', connectionData.connectionId);
        // You might store or use connectionData.connectionId if needed
      } catch (error) {
        console.error(
          `Error parsing ${SSEEventType.CONNECTED} event:`,
          error,
          event
        );
      }
    });

    // Generic message handler (optional, catches events without specific listeners)
    eventSource.onmessage = (event) => {
      console.log('Generic SSE message received:', event.type, event.data);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      // Consider if closing is always the right action, maybe implement reconnection logic?
      eventSource.close();
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

  async getOrderLinks() {
    const response = await axios.get<{ data: GetOrderLinksOutput[] }>(
      `${this.apiUrl}/link`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async createOrderLink(data: CreateOrderLinkInput) {
    const response = await axios.post<{ data: CreateOrderLinkOutput }>(
      `${this.apiUrl}/link`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async getOrderLink(orderLinkId: string) {
    const response = await axios.get<GetOrderLinkOutput>(
      `${this.apiUrl}/link/${orderLinkId}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      }
    );
    return {
      data: response.data,
      revalidate: 0,
      tags: [`order-${orderLinkId}`],
    };
  }

  async deleteOrderLink(orderLinkId: string) {
    const response = await axios.delete<{ data: DeleteOrderLinkOutput }>(
      `${this.apiUrl}/link/${orderLinkId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
}

export default Transaction;
