# Pylon SDK

The Pylon SDK is a comprehensive toolkit for integrating Pylon's payment processing and merchant services into your application. It provides a set of easy-to-use functions and React hooks for seamless integration with the Pylon API.

## Installation

Before installing, you need to set up authentication for the package registry:

1. Generate a GitHub Personal Access Token (PAT):

   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Click "Generate new token"
   - Select at least the `read:packages` scope
   - Copy the generated token

2. Create or edit your `.npmrc` file in your project root:

```
@backpack-fux:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:authToken=YOUR_GITHUB_PAT
```

3. Add `.npmrc` to your `.gitignore` file to ensure it's not committed to your repository.

Now you can install the Pylon SDK, use pnpm you heathen:

```
pnpm install pylon-sdk
```

## Usage

### Initializing the SDK

First, import and initialize the PylonSDK:

```
import { PylonSDK } from "pylon-sdk";

const sdk = new PylonSDK('https://api.pylon.com', 'your-api-token');
```

### Using the SDK in React Components

The SDK provides React hooks for easy integration:

```
import { useAuth, useBridge, useMerchant, useTransaction, useWorldpay } from 'pylon-sdk';
function MyComponent() {
const { processTransaction, isLoading, error } = useTransaction(sdk);
const handlePayment = async () => {
try {
const result = await processTransaction({
// transaction data
});
console.log(result);
} catch (err) {
console.error(err);
}
};
// ... rest of your component
}
```

## Available Hooks

- `useAuth`: For authentication-related operations
- `useBridge`: For Bridge API operations
- `useMerchant`: For merchant-related operations
- `useTransaction`: For transaction processing
- `useWorldpay`: For Worldpay-specific operations

## API Reference

### Auth API

- `generateChallenge()`: Generate an authentication challenge
- `registerPasskey(data)`: Register a new passkey
- `authenticatePasskey(data)`: Authenticate using a passkey
- `initiatePasskeyRegistration(data)`: Initiate the passkey registration process
- `issueOTP(data)`: Issue a one-time password
- `verifyOTP(data)`: Verify a one-time password
- `generateFarcasterJWT(data)`: Generate a Farcaster JWT
- `deleteFarcasterJWT()`: Delete a Farcaster JWT

### Bridge API

- `getPrefundedAccountBalance()`: Get the balance of a prefunded account
- `createPrefundedAccountTransfer(data)`: Create a transfer from a prefunded account
- `processWebhook(data)`: Process a webhook

### Merchant API

- `createMerchant(data)`: Create a new merchant
- `getMerchant(merchantId)`: Get merchant details
- `updateMerchant(merchantId, data)`: Update merchant details
- `deleteMerchant(merchantId)`: Delete a merchant

### Transaction API

- `processTransaction(data)`: Process a new transaction
- `getTransactionStatus(transactionId)`: Get the status of a transaction

### Worldpay API

- `authorizePayment(data)`: Authorize a payment
- `queryPaymentStatus(transactionReference)`: Query the status of a payment
- `performRiskAssessment(data)`: Perform a risk assessment
- `createVerifiedToken(data)`: Create a verified token

## Error Handling

All hooks provide an `error` state that you can use to handle and display errors:
