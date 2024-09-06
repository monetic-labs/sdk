type PaymentProcessor = 'WORLDPAY';
type TransactionStatus = 'SUCCESS' | 'FAILURE' | 'PENDING';
type FraudOutcome = 'ACCEPT' | 'CHALLENGE' | 'REJECT' | 'NOT_ASSESSED';

type Address = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  address3?: string;
  postalCode: string;
  city: string;
  state?: string;
  countryCode: string;
  phoneNumber?: string;
};

type TransactionProcessInput = {
  paymentProcessor: PaymentProcessor;
  sessionUrl: string;
  cvcUrl?: string;
  order: {
    merchant: {
      id: string;
    };
    buyer: {
      billingAddress: Address;
      isShippingEqualBilling: boolean;
      shippingAddress?: Address;
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
      billingAddress: Address;
      shippingAddress?: Address;
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

type TransactionListItem = {
  id: string;
  status: TransactionStatus;
  processor: PaymentProcessor;
  paymentMethod: string;
  subtotal: number;
  tipAmount: number;
  total: number;
  currency: string;
  createdAt: string;
  billingAddress: Address;
  shippingAddress: Address;
};

type TransactionListOutput = {
  type: 'INITIAL_LIST' | 'TRANSACTION_UPDATED';
  data:
    | TransactionListItem[]
    | TransactionListItem
    | Partial<TransactionListItem>;
};

export type {
  PaymentProcessor,
  TransactionStatus,
  FraudOutcome,
  Address,
  TransactionProcessInput,
  TransactionProcessOutput,
  TransactionStatusOutput,
  TransactionListItem,
  TransactionListOutput,
};
