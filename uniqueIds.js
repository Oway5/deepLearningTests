const fs = require('fs');
const readline = require('readline');

// Use a Set to store unique video IDs
const uniqueVideoIds = new Set();

// Create a readable stream
const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let videoIdIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the videoID column
        const headers = line.split(',');
        videoIdIndex = headers.indexOf('videoID');

        if (videoIdIndex === -1) {
            console.error('videoID column not found in the CSV');
            rl.close();
            return;
        }
        
        isFirstLine = false;
    } else {
        // Process each line after the header
        const columns = line.split(',');
        if (columns[videoIdIndex]) {
            uniqueVideoIds.add(columns[videoIdIndex]);
        }
    }
});

rl.on('close', () => {
    console.log(`Total unique video IDs: ${uniqueVideoIds.size}`);
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});
