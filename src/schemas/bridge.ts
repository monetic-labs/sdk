// schemas/bridge.ts
import { z } from 'zod';

const BridgePaymentRailEnum = z.enum(['ach', 'wire', 'internal_transfer', 'crypto']);
const BridgeCurrencyEnum = z.enum(['USD', 'USDC']);

export const BridgeSchema = {
  getPrefundedAccountBalance: {
    response: z.object({
      data: z.array(z.object({
        id: z.string(),
        available_balance: z.string(),
        currency: z.string(),
        name: z.string(),
      })),
    }),
  },

  createPrefundedAccountTransfer: {
    body: z.object({
      amount: z.number().min(20),
      on_behalf_of: z.string().uuid(),
      developer_fee: z.number().min(0).max(100).optional(),
      source: z.object({
        payment_rail: BridgePaymentRailEnum,
        currency: BridgeCurrencyEnum,
        prefunded_account_id: z.string().uuid(),
      }),
      destination: z.object({
        payment_rail: BridgePaymentRailEnum,
        currency: BridgeCurrencyEnum,
        to_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
      }),
    }),
    response: z.any(), // Define a more specific response schema based on the actual API response
  },

  processWebhook: {
    body: z.object({
      event_type: z.string(),
      event_object_id: z.string(),
      event_object: z.object({
        kyc_status: z.string(),
        tos_status: z.string(),
      }).optional(),
    }).passthrough(), // Allow additional properties for flexibility
    response: z.any(), // Define a more specific response schema if needed
  },
};

export type BridgeSchemaType = typeof BridgeSchema;