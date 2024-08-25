type ISO3166Alpha2Country = 'GB' | 'US' | 'FR' | 'DE'; // Add more as needed
type ISO4217Currency = 'USD' | 'EUR' | 'GBP'; // Add more as needed
type BridgeComplianceKycStatus = 'APPROVED' | 'REJECTED' | 'PENDING';
type BridgeComplianceTosStatus = 'ACCEPTED' | 'REJECTED' | 'PENDING';
type TransferStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

type PhysicalAddress = {
  street1: string;
  street2?: string;
  city: string;
  postcode: string;
  state?: string;
  country: ISO3166Alpha2Country;
};

type Company = {
  name: string;
  email: string;
  phone: string;
  registeredAddress: PhysicalAddress;
  operatingAddress: PhysicalAddress;
  registrationNumber: string;
  taxId: string;
  website: string;
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
  company: Company;
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
    apiKey: {
      id: number;
      key: string;
      createdAt: string;
      updatedAt: string;
      merchantId: number;
    };
  };
};

type TransferStatusInput = {
  transferId: string;
};

type TransferStatusOutput = {
  statusCode: number;
  data: {
    id: string;
    status: TransferStatus;
    amount: number;
    currency: ISO4217Currency;
    createdAt: string;
    updatedAt: string;
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
  TransferStatusInput,
  TransferStatusOutput,
};
