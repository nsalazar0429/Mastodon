import Mastodon from 'mastodon-api';

let mastodonClient = null;

export const getMastondonClient = () => {
    if(!mastodonClient){
        mastodonClient = new Mastodon({
                access_token: process.env.REACT_APP_MASTODON_ACCESS_TOKEN,
                api_url: process.env.REACT_APP_MASTODON_API_URL,
              });
    }
    return mastodonClient
}

export const postStatus  = async (status) => {
    const mastodonClient = getMastondonClient();
    try {
        await mastodonClient.post('statuses', { status });
        console.log('Posted status successfully');
        return true; 
    } catch(error) {
        console.error('Error posting status:', error);
        return false;
    }
}

export const fetchStatuses = async () => {
    const mastodonClient = getMastondonClient();
    try {
        const response = await mastodonClient.get('accounts/verify_credentials');
        const accountId = response.data.id; 
        console.log(`Account ID ${accountId}`);

        // Check if accountId is valid
        if (!accountId) {
          console.log('Account ID is undefined, null, or invalid');
          return; // Return an empty array
        }

        const statuses = await mastodonClient.get(`accounts/${accountId}/statuses`);
       if(statuses){
        console.log(`Fetched statuses successfully`);
       }
        return statuses.data; 
    } catch(error){
        console.error('Error fetching statuses:', error);
        return;
    }
}