import Mastodon from 'mastodon-api';

let mastodonClient = null;

/**
 * Mastodon client set up 
 * 
 * Written by Napoleon Salazar Marques (017493606)
 */
export const getMastondonClient = () => {
    if(!mastodonClient){
        mastodonClient = new Mastodon({
                access_token: process.env.REACT_APP_MASTODON_ACCESS_TOKEN,
                api_url: process.env.REACT_APP_MASTODON_API_URL,
              });
    }
    return mastodonClient
}

/**
 * API call to post new status
 * 
 * Written by Napoleon Salazar Marques (017493606)
 */
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

/**
 * API call to fetch statuses
 * 
 * Written by Gerardo Valdez Lozano (017558281) & Joel Zapana (014379560)
 */
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

/**
 * API call to delete statuses
 * 
 * Written by Viswa Surya Kumar Suvvada (018316532)
 */
export const deleteStatus = async (id) => {
    const mastodonClient = getMastondonClient();
    try {
      await mastodonClient.delete(`statuses/${id}`);
      console.log(`Deleted status ${id} successfully`);
      return true; // Indicate success
    } catch (error) {
      console.error(`Error deleting status ${id}:`, error);
      return false; // Indicate failure
    }
  };