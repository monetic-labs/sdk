import axios from 'axios';
import type {
  CreatePaymentLinkInput,
  CreatePaymentLinkOutput,
  DeletePaymentLinkOutput,
  GetPaymentLinkDetailsOutput,
  PaymentListItem,
  PaymentListOutput,
  PaymentListInput,
  ConfirmPaymentRefundInput,
  ConfirmPaymentRefundOutput,
  GetPaymentRefundsOutput,
} from '@/api/_types/payment';
import { PaymentSSEEventType as SSEEventType } from '@/api/_enums/payment';
import { EventSourcePolyfill } from 'event-source-polyfill';

class Payment {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/payment`;
  }

  async getPaymentList(
    params: PaymentListInput = {},
    callback: (data: PaymentListOutput) => void
  ) {
    const queryParams = new URLSearchParams();

    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.after) queryParams.append('after', params.after);
    if (params.before) queryParams.append('before', params.before);
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const url = queryString
      ? `${this.apiUrl}/?${queryString}`
      : `${this.apiUrl}/`;

    const eventSource = new EventSourcePolyfill(url, {
      heartbeatTimeout: 4 * 60 * 60 * 1000, // 4 hours
      withCredentials: true,
    });

    // Listener for the initial list of transactions
    eventSource.addEventListener(SSEEventType.PAYMENT_INITIAL_LIST, (event) => {
      try {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        const output: PaymentListOutput = {
          type: SSEEventType.PAYMENT_INITIAL_LIST,
          data: parsedData,
        };
        callback(output);
      } catch (error) {
        console.error(
          `Error parsing ${SSEEventType.PAYMENT_INITIAL_LIST} event:`,
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
    eventSource.addEventListener(SSEEventType.HEARTBEAT, () => {
      const output: PaymentListOutput = { type: SSEEventType.HEARTBEAT };
      callback(output);
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

  async refundPayment(paymentId: string, data: ConfirmPaymentRefundInput) {
    const response = await axios.post<{ data: ConfirmPaymentRefundOutput }>(
      `${this.apiUrl}/${paymentId}/refund`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  async getPaymentRefunds(paymentId: string) {
    const response = await axios.get<{ data: GetPaymentRefundsOutput }>(
      `${this.apiUrl}/${paymentId}/refunds`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
}

export default Payment;
