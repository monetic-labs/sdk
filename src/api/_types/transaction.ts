import { BillingAddress, ShippingAddress } from './merchant';

type PaymentProcessor = 'WORLDPAY';
type TransactionStatus = 'SUCCESS' | 'FAILURE' | 'PENDING';
type TransactionListStatus =
  | 'SENT_FOR_AUTHORIZATION'
  | 'AUTHORIZED'
  | 'SENT_FOR_SETTLEMENT'
  | 'SETTLED'
  | 'SETTLEMENT_FAILED'
  | 'CANCELLED'
  | 'ERROR'
  | 'EXPIRED'
  | 'REFUSED'
  | 'SENT_FOR_REFUND'
  | 'REFUNDED'
  | 'REFUND_FAILED';
type FraudOutcome = 'ACCEPT' | 'CHALLENGE' | 'REJECT' | 'NOT_ASSESSED';

type TransactionProcessInput = {
  paymentProcessor: PaymentProcessor;
  sessionUrl: string;
  cvcUrl?: string;
  order: {
    customer: {
      email: string;
      phoneNumber: string;
      billingAddress: BillingAddress;
      shippingAddress?: ShippingAddress;
    };
    value: {
      currency: string;
      amount: number;
    };
  };
};

type TransactionProcessOutput = {
  statusCode: number;
  data: {
    transactionId: string;
    status: TransactionStatus;
    paymentProcessor: PaymentProcessor;
    verifiedToken: {
      tokenId: string;
      paymentInstrument: {
        cardHolderName: string;
        cardNumber: string;
        cardExpiryDate: {
          month: string;
          year: string;
        };
        cardType: string;
      };
    };
    authorizedPayment: {
      amount: number;
      currency: string;
      lastEvent: string;
      paymentStatus: string;
      riskScore?: number;
    };
    fraudAssessment?: {
      fraudOutcome: FraudOutcome;
      fraudScore?: number;
      riskFactor?: string;
    };
    merchant: {
      id: string;
      name: string;
    };
    buyer: {
      billingAddress: BillingAddress;
      shippingAddress?: ShippingAddress;
    };
    createdAt: string;
    updatedAt: string;
  };
};

type TransactionStatusOutput = {
  statusCode: number;
  data: {
    transactionId: string;
    status: TransactionStatus;
    lastEvent: string;
    paymentStatus: string;
  };
};

type CardDetails = {
  cardBin: string;
  cardLastFour: string;
  cardBrand?: string;
  cardFundingType?: string;
  cardIssuerName?: string;
  cardHolderName?: string;
};

type RiskAssessment = {
  score?: number;
  outcome?: string;
  reason?: string[];
};

type TransactionStatusHistory = {
  status: TransactionListStatus;
  amount: number;
  currency: string;
  statusReason?: string;
  createdAt: string;
};

type TransactionListItem = {
  id: string;
  processor: PaymentProcessor;
  paymentMethod: string;
  subtotal: number;
  tipAmount: number;
  total: number;
  currency: string;
  createdAt: string;
  customerPhone?: string;
  customerEmail?: string;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  cardDetails: CardDetails;
  riskAssessment: RiskAssessment;
  transactionStatusHistory: TransactionStatusHistory[];
};

type SSEEvent =
  | { type: 'INITIAL_LIST'; data: TransactionListItem[] }
  | { type: 'TRANSACTION_UPDATED'; data: TransactionListItem }
  | { type: 'error'; message: string };

type TransactionListOutput = {
  type: 'INITIAL_LIST' | 'TRANSACTION_UPDATED';
  data: TransactionListItem[] | TransactionListItem;
};

export type {
  PaymentProcessor,
  TransactionStatus,
  FraudOutcome,
  TransactionProcessInput,
  TransactionProcessOutput,
  TransactionStatusOutput,
  TransactionStatusHistory,
  TransactionListItem,
  TransactionListStatus,
  TransactionListOutput,
  SSEEvent,
};
