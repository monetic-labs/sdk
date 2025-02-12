enum RecoveryWalletMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  BACKPACK = 'BACKPACK',
}

enum RecoveryWalletCustodialProvider {
  PRIVY = 'PRIVY',
}

type RecoveryWalletGenerateInput = {
  identifier: string;
  method: RecoveryWalletMethod;
};

type RecoveryWalletGenerateOutput = {
  id: string;
  identifier: string;
  recoveryMethod: RecoveryWalletMethod;
  publicAddress: string;
  userCustodialId: string;
  custodialProvider: RecoveryWalletCustodialProvider;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
  userId: string;
};

type RecoveryWalletFetchOutput = {
  id: string;
  identifier: string;
  recoveryMethod: RecoveryWalletMethod;
  publicAddress: string;
  userCustodialId: string;
  custodialProvider: RecoveryWalletCustodialProvider;
  updatedAt: string;
  createdAt: string;
  userId: string;
};

export type {
  RecoveryWalletGenerateInput,
  RecoveryWalletGenerateOutput,
  RecoveryWalletFetchOutput,
};

export { RecoveryWalletMethod };
