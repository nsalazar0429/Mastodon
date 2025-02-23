import Mastodon from 'mastodon-api';

export const createMastodonClient = () => {
  return new Mastodon({
    access_token: process.env.REACT_APP_MASTODON_ACCESS_TOKEN,
    api_url: process.env.REACT_APP_MASTODON_API_URL,
  });
};

export default createMastodonClient;