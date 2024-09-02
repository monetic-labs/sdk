type ISO3166Alpha2Country = 'GB' | 'US' | 'FR' | 'DE'; // Add more as needed
type ISO4217Currency = 'USD'; // Add more as needed
type BridgeComplianceKycStatus = 'APPROVED' | 'REJECTED' | 'PENDING';
type BridgeComplianceTosStatus = 'ACCEPTED' | 'REJECTED' | 'PENDING';
type TransferStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
type PersonRole =
  | 'MEMBER'
  | 'DEVELOPER'
  | 'BOOKKEEPER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

type PhysicalAddress = {
  firstName?: string; // Only set if Address is type Billing or Shipping
  lastName?: string; // Only set if Address is type Billing or Shipping
  street1: string;
  street2?: string;
  street3?: string;
  city: string;
  postcode: string;
  state?: string;
  country: ISO3166Alpha2Country;
};

type Company = {
  name: string;
  email: string;
  registeredAddress: PhysicalAddress;
};

type Representative = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  role?: PersonRole;
};

type Compliance = {
  complianceUuid: string;
  kycLink: string;
  tosLink: string;
  kycStatus: BridgeComplianceKycStatus;
  tosStatus: BridgeComplianceTosStatus;
  createdAt: string;
};

type MerchantCreateInput = {
  fee: number;
  walletAddress: `0x${string}`;
  company: Company;
  representatives: Representative[];
  compliance?: Compliance;
};

type MerchantCreateOutput = {
  statusCode: number;
  data: {
    compliance: Compliance & {
      id: number;
      updatedAt: string;
      merchantId: number;
    };
  };
};

export type {
  ISO3166Alpha2Country,
  ISO4217Currency,
  BridgeComplianceKycStatus,
  BridgeComplianceTosStatus,
  TransferStatus,
  PhysicalAddress,
  Company,
  Compliance,
  MerchantCreateInput,
  MerchantCreateOutput,
};
