import { PylonApiClient } from '@/client';
import { WorldpaySchema, WorldpaySchemaType } from '@/schemas/worldpay';
import { z } from 'zod';

export const authorizePayment = (client: PylonApiClient) => 
  (data: WorldpaySchemaType['authorizePayment']['request']) => 
    client.post<z.infer<typeof WorldpaySchema.authorizePayment.response>>('/worldpay/authorize-payment', data);

export const queryPaymentStatus = (client: PylonApiClient) => 
  (transactionReference: string) => 
    client.get<z.infer<typeof WorldpaySchema.queryPaymentStatus.response>>(`/worldpay/payment-status/${transactionReference}`);

export const performRiskAssessment = (client: PylonApiClient) => 
  (data: WorldpaySchemaType['riskAssessment']['request']) => 
    client.post<z.infer<typeof WorldpaySchema.riskAssessment.response>>('/worldpay/risk-assessment', data);

export const createVerifiedToken = (client: PylonApiClient) => 
  (data: WorldpaySchemaType['verifiedToken']['request']) => 
    client.post<z.infer<typeof WorldpaySchema.verifiedToken.response>>('/worldpay/verified-token', data);

export type WorldpayApi = {
  authorizePayment: ReturnType<typeof authorizePayment>;
  queryPaymentStatus: ReturnType<typeof queryPaymentStatus>;
  performRiskAssessment: ReturnType<typeof performRiskAssessment>;
  createVerifiedToken: ReturnType<typeof createVerifiedToken>;
};