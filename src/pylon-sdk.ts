import * as AuthApi from '@/api/auth';
import * as BridgeApi from '@/api/bridge';
import * as MerchantApi from '@/api/merchant';
import * as TransactionApi from '@/api/transaction';
import * as WorldpayApi from '@/api/worldpay';
import { ClientType, createPylonApiClient } from '@/client';

export function createPylonSDK(baseURL: string, token?: string, clientType: ClientType = 'fetch') {
  const client = createPylonApiClient(baseURL, token, clientType);

  return {
    transaction: {
      processTransaction: TransactionApi.processTransaction(client),
      getTransactionStatus: TransactionApi.getTransactionStatus(client),
      // ... other transaction methods ...
    },
    merchant: {
      createMerchant: MerchantApi.createMerchant(client),
      getTransferStatus: MerchantApi.getTransferStatus(client),
      // ... other merchant methods ...
    },
    auth: {
      generateChallenge: AuthApi.generateChallenge(client),
      registerPasskey: AuthApi.registerPasskey(client),
      authenticatePasskey: AuthApi.authenticatePasskey(client),
      issueOTP: AuthApi.issueOTP(client),
      verifyOTP: AuthApi.verifyOTP(client),
      findPasskeysForUser: AuthApi.findPasskeysForUser(client),
      removePasskey: AuthApi.removePasskey(client),
      registerPasskeyForExistingUser: AuthApi.registerPasskeyForExistingUser(client),
      initiatePasskeyRegistration: AuthApi.initiatePasskeyRegistration(client),
      generateFarcasterJWT: AuthApi.generateFarcasterJWT(client),
      deleteFarcasterJWT: AuthApi.deleteFarcasterJWT(client),
      // ... other auth methods ...
    },
    bridge: {
      getPrefundedAccountBalance: BridgeApi.getPrefundedAccountBalance(client),
      createPrefundedAccountTransfer: BridgeApi.createPrefundedAccountTransfer(client),
      processWebhook: BridgeApi.processWebhook(client),
      // ... other bridge methods ...
    },
    worldpay: {
      authorizePayment: WorldpayApi.authorizePayment(client),
      queryPaymentStatus: WorldpayApi.queryPaymentStatus(client),
      performRiskAssessment: WorldpayApi.performRiskAssessment(client),
      createVerifiedToken: WorldpayApi.createVerifiedToken(client),
      // ... other worldpay methods ...
    },
  };
}

export type PylonSDK = ReturnType<typeof createPylonSDK>;

// Export individual API types if needed
export type { AuthApi } from '@/api/auth';
export type { BridgeApi } from '@/api/bridge';
export type { MerchantApi } from '@/api/merchant';
export type { TransactionApi } from '@/api/transaction';
export type { WorldpayApi } from '@/api/worldpay';

