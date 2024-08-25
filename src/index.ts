// TYPES
// TODO: We should export the pylon schema as a library. This will allow us to use the same types for the client and server.
import { PylonConfig } from './_types';
import * as MerchantTypes from './api/_types/merchant';
import * as BridgeTypes from './api/_types/bridge';
import * as AuthTypes from './api/_types/auth';

// API
import Auth from './api/Auth';
import Bridge from './api/Bridge';
import Merchant from './api/Merchant';
import Pylon from './api/Pylon';

// HOOKS
import { useAuth } from './hooks';

// EXPORTS
export {
  type PylonConfig,
  type MerchantTypes,
  type BridgeTypes,
  type AuthTypes,
};
export { Auth, Bridge, Merchant, Pylon };
export { useAuth };
