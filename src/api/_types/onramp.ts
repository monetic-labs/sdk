import { BillingAddress } from './merchant';
import { FiatCurrency } from '../_enums/merchant';

export enum PaymentMethod {
  CARD = 'CARD',
}

type BillingAddressXOR =
  | {
      billingAddress: BillingAddress;
      billingAddressId?: never;
    }
  | {
      billingAddress?: never;
      billingAddressId: string;
    };

type RegisteredCustomerBase = {
  id: string;
};

type GuestCustomerBase = {
  email: string;
  phoneNumber: string;
  walletAddress: string;
};

export type RegisteredCustomer = RegisteredCustomerBase & BillingAddressXOR;
export type GuestCustomer = GuestCustomerBase & BillingAddressXOR;

/**
 * Defines the input for processing an on-ramp transaction, based on OnRampProcessSchema.
 */
export type OnRampProcessInput = {
  paymentMethod: PaymentMethod;
  sessionUrl?: string;
  cvcUrl?: string;
  walletToken?: string;
  order: {
    customer: RegisteredCustomer | GuestCustomer;
    value: {
      currency: FiatCurrency;
      amount: number;
    };
  };
  createPaymentIntent?: boolean;
  clientRef?: string;
};

export type OnRampProcessOutput = {
  customerId: string;
  billingAddressId: string;
};
