// schemas/worldpay.ts
import { z } from 'zod';

const ISO4217Currency = z.enum(['USD', 'EUR', 'GBP']); // Add more currencies as needed
const ISO3166Alpha2Country = z.enum(['US', 'GB', 'FR']); // Add more countries as needed

const WorldpayPaymentInstrumentType = z.enum(['card/checkout', 'card/plain']);
const WorldpayPaymentChannelType = z.enum(['ecom', 'moto']);
const WorldpayRiskAssessmentInstrumentType = z.enum(['card/tokenized', 'card/front']);
const WorldpayFraudOutcomeTypes = z.enum(['lowRisk', 'highRisk', 'review']);

export const WorldpaySchema = {
  authorizePayment: {
    request: z.object({
      transactionReference: z.string(),
      merchant: z.object({
        entity: z.string(),
      }),
      instruction: z.object({
        requestAutoSettlement: z.object({
          enabled: z.boolean(),
        }),
        narrative: z.object({
          line1: z.string(),
        }),
        value: z.object({
          currency: ISO4217Currency,
          amount: z.number(),
        }),
        paymentInstrument: z.object({
          type: z.string(),
          tokenHref: z.string(),
          cvcHref: z.string().optional(),
        }),
      }),
      channel: WorldpayPaymentChannelType,
    }),
    response: z.object({
      outcome: z.string(),
      riskFactors: z.array(z.object({
        type: z.string(),
        risk: z.string(),
        detail: z.string().optional(),
      })),
      issuer: z.object({
        authorizationCode: z.string(),
      }),
      scheme: z.object({
        reference: z.string(),
      }),
      paymentInstrument: z.object({
        type: z.string(),
        card: z.object({
          number: z.object({
            bin: z.string(),
            last4Digits: z.string(),
          }),
          category: z.string(),
          brand: z.string(),
          fundingType: z.string(),
          issuer: z.object({
            name: z.string(),
          }),
          paymentAccountReference: z.string(),
        }),
      }),
      _links: z.record(z.object({
        href: z.string(),
      })),
    }),
  },

  queryPaymentStatus: {
    response: z.object({
      lastEvent: z.string(),
      _links: z.record(z.object({
        href: z.string(),
      })),
    }),
  },

  riskAssessment: {
    request: z.object({
      transactionReference: z.string(),
      merchant: z.object({ entity: z.string() }),
      instruction: z.object({
        value: z.object({
          amount: z.number(),
          currency: ISO4217Currency,
        }),
        paymentInstrument: z.object({
          type: WorldpayRiskAssessmentInstrumentType,
          href: z.string(),
        }),
      }),
      requestExemption: z.boolean().optional(),
      doNotApplyExemption: z.boolean().optional(),
      riskData: z.object({
        account: z.object({
          shopperId: z.string().optional(),
          email: z.string().optional(),
          dateOfBirth: z.string().optional(),
        }).optional(),
        transaction: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          phoneNumber: z.string().optional(),
        }).optional(),
        shipping: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          address: z.object({
            address1: z.string(),
            address2: z.string().optional(),
            address3: z.string().optional(),
            postalCode: z.string(),
            city: z.string(),
            state: z.string().optional(),
            countryCode: ISO3166Alpha2Country,
            phoneNumber: z.string().optional(),
          }).optional(),
        }).optional(),
        custom: z.object({
          string1: z.string().optional(),
          // ... Add other custom fields as needed
        }).optional(),
      }),
      deviceData: z.object({
        collectionReference: z.string().optional(),
        ipAddress: z.string().optional(),
      }).optional(),
    }),
    response: z.object({
      outcome: WorldpayFraudOutcomeTypes,
      transactionReference: z.string(),
      riskProfile: z.object({
        href: z.string(),
      }),
      reason: z.array(z.string()).optional(),
      score: z.number().optional(),
      exemption: z.object({
        placement: z.string(),
        type: z.string(),
      }).optional(),
    }),
  },

  verifiedToken: {
    request: z.object({
      description: z.string().optional(),
      verificationCurrency: z.string(),
      paymentInstrument: z.object({
        type: WorldpayPaymentInstrumentType,
        cardHolderName: z.string(),
        sessionHref: z.string(),
        billingAddress: z.object({
          address1: z.string(),
          address2: z.string().optional(),
          address3: z.string().optional(),
          postalCode: z.string(),
          city: z.string(),
          state: z.string().optional(),
          countryCode: ISO3166Alpha2Country,
        }),
      }),
      merchant: z.object({
        entity: z.string(),
      }),
      narrative: z.object({
        line1: z.string(),
        line2: z.string().optional(),
      }),
      namespace: z.string().optional(),
      tokenExpiryDateTime: z.string().optional(),
    }),
    response: z.object({
      _embedded: z.object({
        token: z.object({
          tokenId: z.string().optional(),
          description: z.string(),
          tokenExpiryDateTime: z.string(),
          namespace: z.string().optional(),
          schemeTransactionReference: z.string().optional(),
          tokenPaymentInstrument: z.object({
            type: z.string(),
            href: z.string(),
          }),
          paymentInstrument: z.object({
            type: z.string().optional(),
            cardNumber: z.string(),
            cardHolderName: z.string(),
            cardExpiryDate: z.object({
              month: z.number(),
              year: z.number(),
            }),
            billingAddress: z.object({
              address1: z.string(),
              address2: z.string().optional(),
              address3: z.string().optional(),
              postalCode: z.string(),
              city: z.string(),
              state: z.string().optional(),
              countryCode: z.string(),
            }),
            bin: z.string(),
            brand: z.string(),
          }),
          _links: z.record(z.object({
            href: z.string(),
          })),
        }),
        verification: z.object({
          outcome: z.string(),
          schemeTransactionReference: z.string(),
          checkedAt: z.string(),
          riskFactors: z.array(z.object({
            risk: z.string(),
            type: z.string(),
            detail: z.string().optional(),
          })),
          paymentInstrument: z.object({
            type: z.string(),
            card: z.object({
              brand: z.string(),
              fundingType: z.string(),
              issuer: z.object({
                name: z.string(),
              }),
            }),
          }),
          _links: z.record(z.object({
            href: z.string(),
          })),
        }),
      }),
    }),
  },

  error: z.object({
    errorName: z.string(),
    message: z.string(),
  }),
};

export type WorldpaySchemaType = typeof WorldpaySchema;