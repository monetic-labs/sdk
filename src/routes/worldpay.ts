// src/routes/worldpay.ts
import { PylonApiClient } from '../client';
import { WorldpaySchemaType } from '../schemas/worldpay';

export class WorldpayApi {
  constructor(private client: PylonApiClient) {}

  async authorizePayment(data: WorldpaySchemaType['authorizePayment']['request']) {
    return this.client.post<WorldpaySchemaType['authorizePayment']['response']>('/worldpay/authorize-payment', data);
  }

  async queryPaymentStatus(transactionReference: string) {
    return this.client.get<WorldpaySchemaType['queryPaymentStatus']['response']>(`/worldpay/payment-status/${transactionReference}`);
  }

  async performRiskAssessment(data: WorldpaySchemaType['riskAssessment']['request']) {
    return this.client.post<WorldpaySchemaType['riskAssessment']['response']>('/worldpay/risk-assessment', data);
  }

  async createVerifiedToken(data: WorldpaySchemaType['verifiedToken']['request']) {
    return this.client.post<WorldpaySchemaType['verifiedToken']['response']>('/worldpay/verified-token', data);
  }
}