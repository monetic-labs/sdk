import { Network, StableCurrency } from '../_enums/merchant';
import { PaymentType, PaymentSSEEventType } from '../_enums/payment';
import { BillingAddress, Customer, ShippingAddress } from './merchant';

// =================================================================
// Payment List
// =================================================================

type PaymentListInput = {
  limit?: number;
  after?: string;
  before?: string;
  search?: string;
  status?: PaymentType;
};

type PaymentListItem = {
  id: string;
  merchantId: string;
  customerId: string;
  clientRef: string | null;
  tipAmount: string;
  subtotalAmount: string;
  totalAmount: string;
  txHash: string;
  sender: string;
  recipient: string;
  currency: StableCurrency;
  network: Network;
  note: string | null;
  paymentType: PaymentType;
  createdAt: string;
  updatedAt: string;
  billingAddressId: string;
  shippingAddressId: string | null;
  originalPaymentId: string | null;
  onRampId: string | null;
  billingAddress: BillingAddress;
  shippingAddress?: ShippingAddress;
  customer: Customer;
};

type PaymentListPagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

/**
 * Type for the standard REST response for the payment list.
 */
type PaymentListResponse = {
  list: PaymentListItem[];
  meta: PaymentListPagination;
};

/**
 * Discriminated union for handling Server-Sent Events (SSE) for the payment list.
 */
type PaymentListOutput =
  | {
      type: PaymentSSEEventType.PAYMENT_INITIAL_LIST;
      data: PaymentListResponse;
    }
  | {
      type: PaymentSSEEventType.PAYMENT_UPDATED;
      data: PaymentListItem;
    }
  | {
      type: PaymentSSEEventType.HEARTBEAT;
    }
  | {
      type: PaymentSSEEventType.ERROR;
      message: string;
    };

// =================================================================
// Payment Links
// =================================================================

type PaymentCustomer = {
  id?: string;
  walletAddress?: string;
  email?: string;
  phone?: string;
};

type CreatePaymentLinkInput = {
  order: {
    subtotal: number;
    accountAddress?: string;
    network?: Network;
    currency?: StableCurrency;
  };
  customer: {
    email?: string;
    phone?: string;
  };
};

type CreatePaymentLinkOutput = {
  id: string;
  link: string;
  merchant: {
    name: string;
    settlement: {
      address: string;
      currency: StableCurrency;
      network: Network;
    };
  };
  order: {
    subtotal: number;
  };
  customer: PaymentCustomer;
  expiresAt: string;
  paymentToken: string;
};

type GetPaymentLinkDetailsOutput = CreatePaymentLinkOutput & {
  id: string;
  link: string;
};

type ConfirmPaymentLinkInput = {
  transactionHash: string;
  note?: string;
  billingAddressId: string;
  shippingAddressId?: string;
};

// TODO
type ConfirmPaymentLinkOutput = {
  success: boolean;
};

type DeletePaymentLinkOutput = {
  success: boolean;
};

// =================================================================
// Payment Refund
// =================================================================

type ConfirmPaymentRefundInput = {
  transactionHash: string;
};

type ConfirmPaymentRefundOutput = {
  success: boolean;
};

export type {
  PaymentListInput,
  PaymentListItem,
  PaymentListPagination,
  PaymentListResponse,
  PaymentListOutput,
  PaymentCustomer,
  CreatePaymentLinkInput,
  CreatePaymentLinkOutput,
  GetPaymentLinkDetailsOutput,
  ConfirmPaymentLinkInput,
  ConfirmPaymentLinkOutput,
  DeletePaymentLinkOutput,
  ConfirmPaymentRefundInput,
  ConfirmPaymentRefundOutput,
};
