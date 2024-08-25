// TYPES
// TODO: We should export the pylon schema as a library. This will allow us to use the same types for the client and server.
import { PylonConfig } from './_types';
import * as AuthTypes from './api/_types/auth';
import * as BridgeTypes from './api/_types/bridge';
import * as MerchantTypes from './api/_types/merchant';
import * as TransactionTypes from './api/_types/transaction';

// API
import Pylon from './api/Pylon';
import Auth from './api/Auth';
import Bridge from './api/Bridge';
import Merchant from './api/Merchant';
import Transaction from './api/Transaction';

// HOOKS
import { useAuth } from './hooks';

// EXPORTS
export {
  type PylonConfig,
  type AuthTypes,
  type BridgeTypes,
  type MerchantTypes,
  type TransactionTypes,
};
export { Pylon, Auth, Bridge, Merchant, Transaction };
export { useAuth };
