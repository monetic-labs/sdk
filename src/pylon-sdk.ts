// src/index.ts or src/pylon-sdk.ts
import { ClientType, PylonApiClient } from '@/client';
import { AuthApi } from '@/routes/auth'; // New auth API
import { BridgeApi } from '@/routes/bridge';
import { MerchantApi } from '@/routes/merchant';
import { TransactionApi } from '@/routes/transaction';
import { WorldpayApi } from '@/routes/worldpay';

export class PylonSDK {
  transaction: TransactionApi;
  merchant: MerchantApi;
  auth: AuthApi; 
  bridge: BridgeApi;
  worldpay: WorldpayApi;

  constructor(baseURL: string, token?: string, clientType: ClientType = 'fetch') {
    const client = new PylonApiClient(baseURL, token, clientType);
    this.transaction = new TransactionApi(client);
    this.merchant = new MerchantApi(client);
    this.auth = new AuthApi(client);
    this.bridge = new BridgeApi(client);
    this.worldpay = new WorldpayApi(client);
  }
}

export * from '@/pylon-sdk';

