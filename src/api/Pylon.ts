import Auth from './Auth';
import Bridge from './Bridge';
import { Environment, PylonConfig } from '../_types';
import type {
  PasskeyRegistrationData,
  AuthenticatePasskeyData,
  InitiatePasskeyRegistrationData,
  RegisterPasskeyForExistingUserData,
  FarcasterJWTData,
  IssueOTP,
  VerifyOTP,
} from '@/api/_types/auth';
import type { CreatePrefundedAccountTransferBody } from '@/api/_types/bridge';
import Merchant from './Merchant';
import type { MerchantCreateInput } from '@/api/_types/merchant';
import Transaction from './Transaction';
import type {
  TransactionListOutput,
  TransactionProcessInput,
  TransactionProcessRefundInput,
} from '@/api/_types/transaction';

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

    this.auth = new Auth(this.apiUrl);
    this.bridge = new Bridge(this.apiUrl);
    this.merchant = new Merchant(this.apiUrl);
    this.transaction = new Transaction(this.apiUrl);
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

  async issueOTP(data: IssueOTP) {
    return this.auth.issueOTP(data);
  }

  async verifyOTP(data: VerifyOTP) {
    return this.auth.verifyOTP(data);
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

  async initiateLoginOTP(data: IssueOTP) {
    return this.auth.initiateLoginOTP(data);
  }

  async verifyLoginOTP(data: VerifyOTP) {
    return this.auth.verifyLoginOTP(data);
  }

  async checkAuthStatus() {
    return this.auth.checkAuthStatus();
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

  // TRANSACTION METHODS
  async processTransaction(data: TransactionProcessInput) {
    return this.transaction.processTransaction(data);
  }

  async getTransactionStatus(transferId: string) {
    return this.transaction.getTransactionStatus(transferId);
  }

  async getTransactionList(callback: (data: TransactionListOutput) => void) {
    return this.transaction.getTransactionList(callback);
  }

  async processRefund(data: TransactionProcessRefundInput) {
    return this.transaction.processRefund(data);
  }
}

export default Pylon;
