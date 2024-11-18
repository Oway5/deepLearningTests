import { ApifyClient } from 'apify-client';
import fs from 'fs';
import path from 'path';

// Initialize the ApifyClient with your Apify API token
const client = new ApifyClient({
    token: 'apify_api_1sfnWiP2iSn8f0JY0KkD0KFsI1vLGN2vKbg3',
});

// Path to the single file to be processed
const filePath = './scriptingData/tests/test.txt'; // Replace with your actual file path
const outputDirectory = './scriptingData/results/';

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

// Function to read URLs from a file
const readUrlsFromFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const urls = data.split('\n').filter(url => url.trim() !== '');
            resolve(urls);
        });
    });
};

// Function to process the file
const processFile = async (filePath) => {
    try {
        const urls = await readUrlsFromFile(filePath);
        if (urls.length === 0) {
            console.log(`No URLs found in file: ${filePath}`);
            return;
        }

        // Prepare Actor input with proxy configuration
        const input = {
            "youtube_urls": urls,
            "proxyConfiguration": {
                "useApifyProxy": true,
                "apifyProxyGroups": ["RESIDENTIAL"]
            }
        };

        // Run the Actor and wait for it to finish
        const run = await client.actor("knowbaseai/youtube-transcript-extractor").call(input);

        // Fetch and print Actor results from the run's dataset (if any)
        console.log(`Results from dataset for file: ${filePath}`);
        console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        // Save the JSON response to a file
        const outputFilePath = path.join(outputDirectory, `${path.basename(filePath, path.extname(filePath))}_results.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(items, null, 2));
        console.log(`Results saved to ${outputFilePath}`);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
};

// Process the single file
processFile(filePath);