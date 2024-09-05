type ISO3166Alpha2Country = 'GB' | 'US' | 'FR' | 'DE'; // Add more as needed
type ISO4217Currency = 'USD'; // Add more as needed
type BridgeComplianceKycStatus =
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'not_started'
  | 'incomplete'
  | 'awaiting_ubo'
  | 'manual_review'
  | 'under_review'
  | 'approved'
  | 'rejected';
type BridgeComplianceTosStatus = 'accepted' | 'pending';

type TransferStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
type PersonRole =
  | 'MEMBER'
  | 'DEVELOPER'
  | 'BOOKKEEPER'
  | 'ADMIN'
  | 'SUPER_ADMIN';
type Address = `0x${string}`;

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
  kycLink: string;
  tosLink: string;
  kycStatus: BridgeComplianceKycStatus;
  tosStatus: BridgeComplianceTosStatus;
};

type MerchantCreateInput = {
  fee: number;
  walletAddress: Address;
  company: Company;
  representatives: Representative[];
  compliance?: {
    bridgeCustomerId: string;
    bridgeComplianceId: string;
  };
};

type MerchantCreateOutput = {
  statusCode: number;
  data: Compliance;
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
