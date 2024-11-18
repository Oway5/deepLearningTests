import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with your Apify API token
// Replace the '<YOUR_API_TOKEN>' with your token
filecounter=0;
const client = new ApifyClient({
    token: 'apify_api_1sfnWiP2iSn8f0JY0KkD0KFsI1vLGN2vKbg3',
});
//loop that opens ./scriptingData/urls/.. and goes through each file

// Prepare Actor input with proxy configuration
const input = {
    "youtube_urls": [
        "https://www.youtube.com/watch?v=UF8uR6Z6KLc"
    ],
    "proxyConfiguration": {
        "useApifyProxy": true,
        "apifyProxyGroups": ["RESIDENTIAL"]
    }
};

// Run the Actor and wait for it to finish
const run = await client.actor("knowbaseai/youtube-transcript-extractor").call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs