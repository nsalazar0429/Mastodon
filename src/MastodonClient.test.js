import { postStatus, fetchStatuses, deleteStatus, getMastondonClient } from './MastodonClient';
import Mastodon from 'mastodon-api';

jest.mock('mastodon-api'); // Mock the mastodon-api library

describe('MastodonClient', () => {
    const mockAccessToken = 'test-access-token';
    const mockApiUrl = 'https://mastodon.example.com/api/v1/';

    beforeEach(() => {
        // Mock the Mastodon constructor to return a mock client
        Mastodon.mockImplementation(() => ({
            get: jest.fn(() => Promise.resolve()),
            post: jest.fn(() => Promise.resolve()), // Mock the post method 
            delete: jest.fn(() => Promise.resolve()),
        }));

        // Set environment variables for the tests
        process.env.REACT_APP_MASTODON_ACCESS_TOKEN = mockAccessToken;
        process.env.REACT_APP_MASTODON_API_URL = mockApiUrl;
    });

    afterEach(() => {
        // Clear mocks after each test
        jest.clearAllMocks();
    });

    describe('getMastodonClient', () => {
        it('creates and returns a Mastodon client instance', () => {
            const client = getMastondonClient();
            expect(Mastodon).toHaveBeenCalledWith({
                access_token: mockAccessToken,
                api_url: mockApiUrl,
            });
            expect(client).toBeDefined();
        });

        it('posts a status to Mastodon', async () => {
            const mockPostResponse = { data: { id: '123' } }; // Mock response from Mastodon API
            const mockMastodonClient = getMastondonClient();
            mockMastodonClient.post.mockResolvedValue(mockPostResponse);

            const success = await postStatus('Test status');

            expect(mockMastodonClient.post).toHaveBeenCalledWith('statuses', { status: 'Test status' });
            expect(success).toBe(true);
        });

        it('fetches statuses from Mastodon', async () => {
            const mockAccountId = '456';
            const mockStatusesResponse = { data: [{ id: '789', content: '<p>Test status</p>' }] };
            const mockMastodonClient = getMastondonClient();
            mockMastodonClient.get
                .mockResolvedValueOnce({ data: { id: mockAccountId } }) // Mock verify_credentials response
                .mockResolvedValueOnce(mockStatusesResponse); // Mock statuses response

            const statuses = await fetchStatuses();

            expect(mockMastodonClient.get).toHaveBeenCalledWith('accounts/verify_credentials');
            expect(mockMastodonClient.get).toHaveBeenCalledWith(`accounts/${mockAccountId}/statuses`);
            expect(statuses).toEqual(mockStatusesResponse.data);
        });

        it('deletes a status from Mastodon', async () => {
          const mockDeleteResponse = { data: {} }; // Mock response from Mastodon API
          const mockMastodonClient = getMastondonClient();
          mockMastodonClient.delete.mockResolvedValue(mockDeleteResponse);

          const success = await deleteStatus('123');

          expect(mockMastodonClient.delete).toHaveBeenCalledWith('statuses/123');
          expect(success).toBe(true);
        });
      });
});