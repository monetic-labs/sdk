import axios from 'axios';
import type {
  CreatePaymentLinkInput,
  CreatePaymentLinkOutput,
  DeletePaymentLinkOutput,
  GetPaymentLinkDetailsOutput,
  PaymentListItem,
  PaymentListOutput,
} from '@/api/_types/payment';
import { PaymentSSEEventType as SSEEventType } from '@/api/_enums/payment';
import { EventSourcePolyfill } from 'event-source-polyfill';

class Payment {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/payment`;
  }

  async getPaymentList(callback: (data: PaymentListOutput) => void) {
    const eventSource = new EventSourcePolyfill(`${this.apiUrl}/`, {
      heartbeatTimeout: 4 * 60 * 60 * 1000, // 4 hours
      withCredentials: true,
    });

    // Listener for the initial list of transactions
    eventSource.addEventListener(SSEEventType.INITIAL_LIST, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        const output: PaymentListOutput = {
          type: SSEEventType.INITIAL_LIST,
          data: parsedData,
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
    eventSource.addEventListener(SSEEventType.PAYMENT_UPDATED, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData: PaymentListItem = JSON.parse(messageEvent.data);
        const output: PaymentListOutput = {
          type: SSEEventType.PAYMENT_UPDATED,
          data: parsedData,
        };
        callback(output);
      } catch (error) {
        console.error(
          `Error parsing ${SSEEventType.PAYMENT_UPDATED} event:`,
          error,
          event
        );
      }
    });

    // Listener for keep-alive messages (if server sends a specific event type)
    eventSource.addEventListener(SSEEventType.KEEP_ALIVE, () => {
      const output: PaymentListOutput = { type: SSEEventType.KEEP_ALIVE };
      callback(output);
    });

    // Optional: Listener for the 'connected' message if you need the connectionId client-side
    eventSource.addEventListener(SSEEventType.CONNECTED, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const connectionData = JSON.parse(messageEvent.data);
        console.log('SSE Connected, ID:', connectionData.connectionId);
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

  async getPaymentLinks() {
    const response = await axios.get<{ data: GetPaymentLinkDetailsOutput[] }>(
      `${this.apiUrl}/link`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async createPaymentLink(data: CreatePaymentLinkInput) {
    const response = await axios.post<{ data: CreatePaymentLinkOutput }>(
      `${this.apiUrl}/link`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async getPaymentLink(paymentLinkId: string) {
    const response = await axios.get<GetPaymentLinkDetailsOutput>(
      `${this.apiUrl}/link/${paymentLinkId}`,
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
      tags: [`payment-${paymentLinkId}`],
    };
  }

  async deletePaymentLink(paymentLinkId: string) {
    const response = await axios.delete<{ data: DeletePaymentLinkOutput }>(
      `${this.apiUrl}/link/${paymentLinkId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
}

export default Payment;
