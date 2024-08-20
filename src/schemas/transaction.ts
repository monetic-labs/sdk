import { z } from 'zod';

export const TransactionProcessInputSchema = z.object({
  paymentProcessor: z.enum(['WORLDPAY']),
  sessionUrl: z.string().url(),
  cvcUrl: z.string().url().optional(),
  order: z.object({
    merchant: z.object({
      id: z.string(),
    }),
    buyer: z.object({
      billingAddress: z.object({
        firstName: z.string(),
        lastName: z.string(),
        address1: z.string(),
        address2: z.string().optional(),
        address3: z.string().optional(),
        postalCode: z.string(),
        city: z.string(),
        state: z.string().optional(),
        countryCode: z.string(),
        phoneNumber: z.string().optional(),
      }),
      isShippingEqualBilling: z.boolean(),
      shippingAddress: z.object({
        firstName: z.string(),
        lastName: z.string(),
        address1: z.string(),
        address2: z.string().optional(),
        address3: z.string().optional(),
        postalCode: z.string(),
        city: z.string(),
        state: z.string().optional(),
        countryCode: z.string(),
        phoneNumber: z.string().optional(),
      }).optional(),
    }),
    value: z.object({
      currency: z.string(),
      amount: z.number().positive(),
    }),
  }),
});

export const TransactionProcessOutputSchema = z.object({
    statusCode: z.number(),
    data: z.object({
      transactionId: z.string().uuid(),
      status: z.enum(['SUCCESS', 'FAILURE', 'PENDING']),
      paymentProcessor: z.enum(['WORLDPAY']),
      verifiedToken: z.object({
        tokenId: z.string(),
        paymentInstrument: z.object({
          cardHolderName: z.string(),
          cardNumber: z.string().length(4), // Last 4 digits
          cardExpiryDate: z.object({
            month: z.string().length(2),
            year: z.string().length(4),
          }),
          cardType: z.string(),
        }),
      }),
      authorizedPayment: z.object({
        amount: z.number(),
        currency: z.string().length(3), // ISO 4217 currency code
        lastEvent: z.string(),
        paymentStatus: z.string(),
        riskScore: z.number().min(0).max(100).optional(),
      }),
      fraudAssessment: z.object({
        fraudOutcome: z.enum([
          'ACCEPT',
          'CHALLENGE',
          'REJECT',
          'NOT_ASSESSED',
        ]),
        fraudScore: z.number().min(0).max(1000).optional(),
        riskFactor: z.string().optional(),
      }).optional(),
      merchant: z.object({
        id: z.string(),
        name: z.string(),
      }),
      buyer: z.object({
        billingAddress: z.object({
          firstName: z.string(),
          lastName: z.string(),
          address1: z.string(),
          address2: z.string().optional(),
          address3: z.string().optional(),
          postalCode: z.string(),
          city: z.string(),
          state: z.string().optional(),
          countryCode: z.string().length(2), // ISO 3166-1 alpha-2
          phoneNumber: z.string().optional(),
        }),
        shippingAddress: z.object({
          firstName: z.string(),
          lastName: z.string(),
          address1: z.string(),
          address2: z.string().optional(),
          address3: z.string().optional(),
          postalCode: z.string(),
          city: z.string(),
          state: z.string().optional(),
          countryCode: z.string().length(2), // ISO 3166-1 alpha-2
          phoneNumber: z.string().optional(),
        }).optional(),
      }),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
});

export const TransactionStatusOutputSchema = z.object({
  statusCode: z.number(),
  data: z.object({
    transactionId: z.string().uuid(),
    status: z.enum(['SUCCESS', 'FAILURE', 'PENDING']),
    lastEvent: z.string(),
    paymentStatus: z.string(),
  }),
});

export type TransactionStatusOutput = z.infer<typeof TransactionStatusOutputSchema>;
export type TransactionProcessInput = z.infer<typeof TransactionProcessInputSchema>;
export type TransactionProcessOutput = z.infer<typeof TransactionProcessOutputSchema>;