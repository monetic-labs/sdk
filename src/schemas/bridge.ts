// schemas/bridge.ts
import { z } from 'zod';

const BridgePaymentRailEnum = z.enum(['ach', 'wire', 'internal_transfer', 'crypto']);
const BridgeCurrencyEnum = z.enum(['USD', 'USDC']);

export const BRIDGE_ENDPOINTS = {
  PREFUNDED_ACCOUNT_BALANCE: '/prefunded-account-balance',
  PREFUNDED_ACCOUNT_TRANSFER: '/prefunded-account-transfer',
  WEBHOOK: '/webhook',
};

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

// Export individual schemas
export const {
  getPrefundedAccountBalance,
  createPrefundedAccountTransfer,
  processWebhook,
} = BridgeSchema;

// Export types
export type BridgeSchemaType = typeof BridgeSchema;
export type BridgePaymentRail = z.infer<typeof BridgePaymentRailEnum>;
export type BridgeCurrency = z.infer<typeof BridgeCurrencyEnum>;

export type GetPrefundedAccountBalanceResponse = z.infer<typeof getPrefundedAccountBalance.response>;
export type CreatePrefundedAccountTransferBody = z.infer<typeof createPrefundedAccountTransfer.body>;
export type CreatePrefundedAccountTransferResponse = z.infer<typeof createPrefundedAccountTransfer.response>;
export type ProcessWebhookBody = z.infer<typeof processWebhook.body>;
export type ProcessWebhookResponse = z.infer<typeof processWebhook.response>;