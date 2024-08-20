import { PylonApiClient } from '@/client';
import { AuthApi } from '@/routes/auth';

// Mock the PylonApiClient
jest.mock('@/client');

describe('AuthApi', () => {
  let authApi: AuthApi;
  let mockClient: jest.Mocked<PylonApiClient>;

  beforeEach(() => {
    mockClient = new PylonApiClient() as jest.Mocked<PylonApiClient>;
    authApi = new AuthApi(mockClient);
  });

  describe('generateChallenge', () => {
    it('should call the client.get method with the correct URL', async () => {
      const mockResponse = { challenge: 'test-challenge' };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await authApi.generateChallenge();

      expect(mockClient.get).toHaveBeenCalledWith('/auth/challenge');
      expect(result).toEqual(mockResponse);
    });
  });

  // Add more test cases for other methods when they are uncommented
});