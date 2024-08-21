import { z } from 'zod';

// Enum for compliance KYC status
const BridgeComplianceKycStatusEnum = z.enum(['APPROVED', 'REJECTED', 'PENDING']);

// Enum for compliance TOS status
const BridgeComplianceTosStatusEnum = z.enum(['ACCEPTED', 'REJECTED', 'PENDING']);

// Enum for ISO 3166-1 alpha-2 country codes
const ISO3166Alpha2CountryEnum = z.enum(['GB', 'US', 'FR', 'DE', /* Add more as needed */]);

// Enum for ISO 4217 currency codes
const ISO4217CurrencyEnum = z.enum(['USD', 'EUR', 'GBP', /* Add more as needed */]);

// Schema for physical address
const PhysicalAddressSchema = z.object({
  street1: z.string().max(50),
  street2: z.string().max(50).optional(),
  city: z.string().max(50),
  postcode: z.string().max(25),
  state: z.string().length(2).optional(),
  country: ISO3166Alpha2CountryEnum,
});

// Schema for company details
const CompanySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  registeredAddress: PhysicalAddressSchema,
  operatingAddress: PhysicalAddressSchema,
  registrationNumber: z.string(),
  taxId: z.string(),
  website: z.string().url(),
});

// Schema for compliance details
const ComplianceSchema = z.object({
  complianceUuid: z.string().uuid(),
  kycLink: z.string().url(),
  tosLink: z.string().url(),
  kycStatus: BridgeComplianceKycStatusEnum,
  tosStatus: BridgeComplianceTosStatusEnum,
  createdAt: z.string().datetime(),
});

// Schema for creating a merchant
export const MerchantCreateInputSchema = z.object({
  company: CompanySchema,
  compliance: ComplianceSchema.optional(),
});

// Schema for merchant creation response
export const MerchantCreateOutputSchema = z.object({
  statusCode: z.number(),
  data: z.object({
    compliance: z.object({
      id: z.number(),
      complianceUuid: z.string().uuid(),
      kycLink: z.string().url(),
      tosLink: z.string().url(),
      kycStatus: BridgeComplianceKycStatusEnum,
      tosStatus: BridgeComplianceTosStatusEnum,
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      merchantId: z.number(),
    }),
    apiKey: z.object({
      id: z.number(),
      key: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      merchantId: z.number(),
    }),
  }),
});

// Schema for getting transfer status
export const TransferStatusInputSchema = z.object({
  transferId: z.string().uuid(),
});

// Schema for transfer status response
export const TransferStatusOutputSchema = z.object({
  statusCode: z.number(),
  data: z.object({
    id: z.string().uuid(),
    status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
    amount: z.number(),
    currency: ISO4217CurrencyEnum,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    // Add more fields as needed based on your actual response
  }),
});

// Type inference
export type MerchantCreateInput = z.infer<typeof MerchantCreateInputSchema>;
export type MerchantCreateOutput = z.infer<typeof MerchantCreateOutputSchema>;
export type TransferStatusInput = z.infer<typeof TransferStatusInputSchema>;
export type TransferStatusOutput = z.infer<typeof TransferStatusOutputSchema>;

// Export additional types that might be useful for SDK users
export type PhysicalAddress = z.infer<typeof PhysicalAddressSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Compliance = z.infer<typeof ComplianceSchema>;

// Export the schemas for users who might want to extend or modify them
export const MerchantSchemas = {
  PhysicalAddressSchema,
  CompanySchema,
  ComplianceSchema,
  MerchantCreateInputSchema,
  MerchantCreateOutputSchema,
  TransferStatusInputSchema,
  TransferStatusOutputSchema,
};