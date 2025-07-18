import Auth from './Auth';
import Bridge from './Bridge';
import Merchant from './Merchant';
import Recovery from './Recovery';
import { Environment, PylonConfig } from '../_types';
import type {
  AuthenticatePasskeyInput,
  FarcasterJWTData,
  IssueOTP,
  RegisterPasskeyInput,
  UpdatePasskeyInput,
  VerifyOTP,
} from '@/api/_types/auth';
import type {
  CreatePrefundedAccountTransferBody,
  CreateVirtualAccountBody,
  UpdateVirtualAccountBody,
} from '@/api/_types/bridge';
import type {
  ApiKeyUpdateInput,
  MerchantCardGetInput,
  MerchantCardTransactionGetInput,
  MerchantCreateInput,
  MerchantRainCompanyCreateInput,
  MerchantPhysicalCardCreateInput,
  MerchantVirtualCardCreateInput,
  MerchantRainCompanyUpdateInput,
  MerchantUserCreateInput,
  MerchantUserUpdateInput,
  UpdateMerchantCardDataInput,
  UpdateMerchantCardPinInput,
  GetMerchantCardPinInput,
  MerchantTelegramMessageCreateInput,
  MerchantFileUploadInput,
  MerchantAccountCreateInput,
  MerchantAccountRainCardWithdrawalRequestInput,
  MerchantChatEvent,
  ApiKeyCreateInput,
} from '@/api/_types/merchant';
import type {
  CreatePaymentLinkInput,
  PaymentListOutput,
} from '@/api/_types/payment';
import type { OnRampProcessInput } from '@/api/_types/onramp';
import type {
  MerchantDisbursementUpdateInput,
  MerchantDisbursementCreateInput,
  MerchantDisbursementEventsInput,
  MerchantDisbursementContactGetAllInput,
} from '@/api/_types/disbursement';
import { RecoveryWalletGenerateInput } from './_types/recovery';
import Disbursement from './Disbursement';
import Payment from './Payment';
import Onramp from './Onramp';

class Pylon {
  private apiUrl: string;

  private auth: Auth;
  private bridge: Bridge;
  private merchant: Merchant;
  private payment: Payment;
  private onramp: Onramp;
  private recovery: Recovery;
  private disbursement: Disbursement;

  private static readonly DEFAULT_URLS: Record<Environment, string> = {
    staging: 'https://api.staging.monetic.xyz',
    production: 'https://api.monetic.xyz',
  };

  constructor(config: PylonConfig) {
    const environment = config.environment || 'production';
    this.apiUrl = config.baseUrl || Pylon.DEFAULT_URLS[environment];

    this.auth = new Auth(this.apiUrl);
    this.bridge = new Bridge(this.apiUrl);
    this.merchant = new Merchant(this.apiUrl);
    this.payment = new Payment(this.apiUrl);
    this.onramp = new Onramp(this.apiUrl);
    this.recovery = new Recovery(this.apiUrl);
    this.disbursement = new Disbursement(this.apiUrl);
  }

  // GENERAL AUTH METHODS
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

  async logout() {
    return this.auth.logout();
  }

  // PASSKEY AUTH METHODS
  async generatePasskeyChallenge() {
    return this.auth.generatePasskeyChallenge();
  }

  async getPasskeyRegistrationOptions(email: string) {
    return this.auth.getPasskeyRegistrationOptions(email);
  }

  async getPasskeys(email: string) {
    return this.auth.getPasskeys(email);
  }

  async registerPasskey(data: RegisterPasskeyInput) {
    return this.auth.registerPasskey(data);
  }

  async authenticatePasskey(data: AuthenticatePasskeyInput) {
    return this.auth.authenticatePasskey(data);
  }

  async updatePasskeyDisplayName(passkeyId: string, data: UpdatePasskeyInput) {
    return this.auth.updatePasskeyDisplayName(passkeyId, data);
  }

  async deletePasskey(passkeyId: string) {
    return this.auth.deletePasskey(passkeyId);
  }

  // MAGIC LINK AUTH METHODS
  async issueMagicLink(email: string) {
    return this.auth.issueMagicLink(email);
  }

  async verifyMagicLink(token: string) {
    return this.auth.verifyMagicLink(token);
  }

  async exchangeMagicLinkToken(token: string) {
    return this.auth.exchangeMagicLinkToken(token);
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

  // VIRTUAL ACCOUNTS
  async getVirtualAccount() {
    return this.bridge.getVirtualAccount();
  }

  async createVirtualAccount(data: CreateVirtualAccountBody) {
    return this.bridge.createVirtualAccount(data);
  }

  async updateVirtualAccount(data: UpdateVirtualAccountBody) {
    return this.bridge.updateVirtualAccount(data);
  }

  // MERCHANT METHODS
  async createMerchant(token: string, data: MerchantCreateInput) {
    return this.merchant.createMerchant(token, data);
  }

  async createApiKey(data: ApiKeyCreateInput) {
    return this.merchant.createApiKey(data);
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

  async getSettlementAccount() {
    return this.merchant.getSettlementAccount();
  }

  async setSettlementAccount(accountId: string) {
    return this.merchant.setSettlementAccount(accountId);
  }

  async getAccounts() {
    return this.merchant.getAccounts();
  }

  async createAccount(data: MerchantAccountCreateInput) {
    return this.merchant.createAccount(data);
  }

  async requestWithdrawalSignatureForRainAccount(
    data: MerchantAccountRainCardWithdrawalRequestInput
  ) {
    return this.merchant.requestWithdrawalSignatureForRainAccount(data);
  }

  async createPhysicalCard(data: MerchantPhysicalCardCreateInput) {
    return this.merchant.createPhysicalCard(data);
  }

  async createVirtualCard(data: MerchantVirtualCardCreateInput) {
    return this.merchant.createVirtualCard(data);
  }

  async decryptVirtualCard(cardId: string) {
    return this.merchant.decryptVirtualCard(cardId);
  }

  async getCards(queryParams: MerchantCardGetInput) {
    return this.merchant.getCards(queryParams);
  }

  async getRainCardBalance() {
    return this.merchant.getRainCardBalance();
  }

  async getCardTransactions(queryParams: MerchantCardTransactionGetInput) {
    return this.merchant.getCardTransactions(queryParams);
  }

  async applyCardCompany(body: MerchantRainCompanyCreateInput) {
    return this.merchant.applyCardCompany(body);
  }

  async updateCardCompany(body: MerchantRainCompanyUpdateInput) {
    return this.merchant.updateCardCompany(body);
  }

  async uploadCardCompanyDocs(file: File) {
    return this.merchant.uploadCardCompanyDocs(file);
  }

  async getCardCompanyStatus() {
    return this.merchant.getCardCompanyStatus();
  }

  async updateRainCard(body: UpdateMerchantCardDataInput) {
    return this.merchant.updateRainCard(body);
  }

  async updateRainCardPin(body: UpdateMerchantCardPinInput) {
    return this.merchant.updateRainCardPin(body);
  }

  async getRainCardPin(body: GetMerchantCardPinInput) {
    return this.merchant.getRainCardPin(body);
  }

  async getUsers() {
    return this.merchant.getUsers();
  }

  async createUser(data: MerchantUserCreateInput) {
    return this.merchant.createUser(data);
  }

  async updateUser(userId: string, data: MerchantUserUpdateInput) {
    return this.merchant.updateUser(userId, data);
  }

  async deleteUser(userId: string) {
    return this.merchant.deleteUser(userId);
  }

  async getUserById() {
    return this.merchant.getUserById();
  }

  // DISBURSEMENT METHODS
  async initiateNewDisbursement(data: MerchantDisbursementCreateInput) {
    return this.disbursement.initiateNewDisbursement(data);
  }

  async initiateExistingDisbursement(
    disbursementId: string,
    data: MerchantDisbursementUpdateInput
  ) {
    return this.disbursement.initiateExistingDisbursement(disbursementId, data);
  }

  async getDisbursementEvents(queryParams: MerchantDisbursementEventsInput) {
    return this.disbursement.getDisbursementEvents(queryParams);
  }

  async getDisbursementContacts(
    queryParams: MerchantDisbursementContactGetAllInput
  ) {
    return this.disbursement.getDisbursementContacts(queryParams);
  }

  // TELEGRAM METHODS
  async createTelegramMessage(body: MerchantTelegramMessageCreateInput) {
    return this.merchant.createTelegramMessage(body);
  }

  async getFileUploadUrl(body: MerchantFileUploadInput) {
    return this.merchant.getFileUploadUrl(body);
  }

  async getChatEvents(callback: (data: MerchantChatEvent) => void) {
    return this.merchant.getChatEvents(callback);
  }

  // PAYMENT METHODS
  async getPaymentList(callback: (data: PaymentListOutput) => void) {
    return this.payment.getPaymentList(callback);
  }

  async getPaymentLinks() {
    return this.payment.getPaymentLinks();
  }

  async createPaymentLink(data: CreatePaymentLinkInput) {
    return this.payment.createPaymentLink(data);
  }

  async getPaymentLink(paymentLinkId: string) {
    return this.payment.getPaymentLink(paymentLinkId);
  }

  async deletePaymentLink(paymentLinkId: string) {
    return this.payment.deletePaymentLink(paymentLinkId);
  }

  // ONRAMP METHODS
  async processOnRamp(data: OnRampProcessInput, apiToken: string) {
    return this.onramp.processOnRamp(data, apiToken);
  }

  // RECOVERY METHODS
  async generateRecoveryWallets(data: RecoveryWalletGenerateInput[]) {
    return this.recovery.generateRecoveryWallets(data);
  }

  async getRecoveryWallets() {
    return this.recovery.getRecoveryWallets();
  }

  async deleteRecoveryWallet(id: string) {
    return this.recovery.deleteRecoveryWallet(id);
  }
}

export default Pylon;
