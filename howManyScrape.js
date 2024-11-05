const fs = require('fs');
const readline = require('readline');

const voteCounts = {}; // Object to store the distribution of votes
const uniqueOver50VideoIds = new Set(); // Set to store unique video IDs with > 50 votes

// Create a readable stream
const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let voteIndex = -1;
let videoIdIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the 'votes' and 'videoID' columns
        const headers = line.split(',');
        voteIndex = headers.indexOf('votes');
        videoIdIndex = headers.indexOf('videoID');

        if (voteIndex === -1 || videoIdIndex === -1) {
            console.error('Required columns not found in the CSV');
            rl.close();
            return;
        }
        
        isFirstLine = false;
    } else {
        // Process each line after the header
        const columns = line.split(',');
        const votes = parseInt(columns[voteIndex], 10);
        const videoID = columns[videoIdIndex];

        if (!isNaN(votes)) {
            // Count votes for distribution
            voteCounts[votes] = (voteCounts[votes] || 0) + 1;

            // If votes > 50, add the videoID to the unique set
            if (votes > 50) {
                uniqueOver50VideoIds.add(videoID);
            }
        }
    }
});

rl.on('close', () => {
    // console.log('Vote distribution:', voteCounts);
    console.log(`Total unique video IDs with more than 50 votes: ${uniqueOver50VideoIds.size}`);
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});
