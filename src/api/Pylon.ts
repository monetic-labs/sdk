import Auth from './Auth';
import Bridge from './Bridge';
import Merchant from './Merchant';
import Transaction from './Transaction';
import { Environment, PylonConfig } from '../_types';
import type { FarcasterJWTData, IssueOTP, VerifyOTP } from '@/api/_types/auth';
import type { CreatePrefundedAccountTransferBody } from '@/api/_types/bridge';
import type {
  ApiKeyUpdateInput,
  MerchantCreateInput,
} from '@/api/_types/merchant';
import type {
  CreateOrderLinkInput,
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

  async issueOTP(data: IssueOTP) {
    return this.auth.issueOTP(data);
  }

  async verifyOTP(data: VerifyOTP) {
    return this.auth.verifyOTP(data);
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

  async logout() {
    return this.auth.logout();
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

  async getComplianceStatus() {
    return this.bridge.getComplianceStatus();
  }

  // MERCHANT METHODS
  async createMerchant(data: MerchantCreateInput) {
    return this.merchant.createMerchant(data);
  }

  async createApiKey() {
    return this.merchant.createApiKey();
  }

  async deleteApiKey(apiKey: string) {
    return this.merchant.deleteApiKey(apiKey);
  }

  async updateApiKey(apiKey: string, data: ApiKeyUpdateInput) {
    return this.merchant.updateApiKey(apiKey, data);
  }

  async getApiKeys() {
    return this.merchant.getApiKeys();
  }

  // TRANSACTION METHODS
  async processTransaction(data: TransactionProcessInput, bearerToken: string) {
    return this.transaction.processTransaction(data, bearerToken);
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

  async getOrderLinks() {
    return this.transaction.getOrderLinks();
  }

  async createOrderLink(data: CreateOrderLinkInput) {
    return this.transaction.createOrderLink(data);
  }

  async getOrderLink(orderLinkId: string) {
    return this.transaction.getOrderLink(orderLinkId);
  }

  async deleteOrderLink(orderLinkId: string) {
    return this.transaction.deleteOrderLink(orderLinkId);
  }
}

export default Pylon;
