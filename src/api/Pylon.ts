import Auth from './Auth';
import Bridge from './Bridge';
import { Environment, PylonConfig } from '../_types';
import type {
  PasskeyRegistrationData,
  AuthenticatePasskeyData,
  InitiatePasskeyRegistrationData,
  RegisterPasskeyForExistingUserData,
  OTPData,
  FarcasterJWTData,
} from '@/api/_types/auth';
import type { CreatePrefundedAccountTransferBody } from '@/api/_types/bridge';
import Merchant from './Merchant';
import type {
  MerchantCreateInput,
  TransferStatusInput,
} from '@/api/_types/merchant';
import Transaction from './Transaction';
import type { TransactionProcessInput } from '@/api/_types/transaction';

class Pylon {
  private apiUrl: string;

  private auth: Auth;
  private bridge: Bridge;
  private merchant: Merchant;
  private transaction: Transaction;

  private static readonly DEFAULT_URLS: Record<Environment, string> = {
    staging: 'https://staging-api.backpack.network',
    production: 'https://api.backpack.network',
  };

  constructor(config: PylonConfig) {
    const environment = config.environment || 'production';
    this.apiUrl = config.baseUrl || Pylon.DEFAULT_URLS[environment];

    this.auth = new Auth(`${this.apiUrl}/v1`);
    this.bridge = new Bridge(`${this.apiUrl}/v1`);
    this.merchant = new Merchant(`${this.apiUrl}/v1`);
    this.transaction = new Transaction(`${this.apiUrl}/v1`);
  }

  // AUTH METHODS
  async generateAccessToken() {
    return this.auth.generateAccessToken();
  }

  async generateChallenge() {
    return this.auth.generateChallenge();
  }

  async registerPasskey(data: PasskeyRegistrationData) {
    return this.auth.registerPasskey(data);
  }

  async authenticatePasskey(data: AuthenticatePasskeyData) {
    return this.auth.authenticatePasskey(data);
  }

  async findPasskeysForUser() {
    return this.auth.findPasskeysForUser();
  }

  async removePasskey(id: number) {
    return this.auth.removePasskey(id);
  }

  async verifyOTP(data: OTPData) {
    return this.auth.verifyOTP(data);
  }

  async issueOTP(data: OTPData) {
    return this.auth.issueOTP(data);
  }

  async registerPasskeyForExistingUser(
    data: RegisterPasskeyForExistingUserData
  ) {
    return this.auth.registerPasskeyForExistingUser(data);
  }

  async initiatePasskeyRegistration(data: InitiatePasskeyRegistrationData) {
    return this.auth.initiatePasskeyRegistration(data);
  }

  async generateFarcasterJWT(data: FarcasterJWTData) {
    return this.auth.generateFarcasterJWT(data);
  }

  async deleteFarcasterJWT() {
    return this.auth.deleteFarcasterJWT();
  }

  // BRIDGE METHODS
  async getPrefundedAccountBalance() {
    return this.bridge.getPrefundedAccountBalance();
  }

  async createPrefundedAccountTransfer(
    data: CreatePrefundedAccountTransferBody
  ) {
    return this.bridge.createPrefundedAccountTransfer(data);
  }

  // MERCHANT METHODS
  async createMerchant(data: MerchantCreateInput) {
    return this.merchant.createMerchant(data);
  }

  async getTransferStatus(data: TransferStatusInput) {
    return this.merchant.getTransferStatus(data);
  }

  // TRANSACTION METHODS
  async processTransaction(data: TransactionProcessInput) {
    return this.transaction.processTransaction(data);
  }

  async getTransactionStatus(transactionId: string) {
    return this.transaction.getTransactionStatus(transactionId);
  }
}

export default Pylon;
