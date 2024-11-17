const fs = require('fs');
const readline = require('readline');

const uniqueChannels = new Set();
let counter = 0;

const stream = fs.createReadStream('../toMessWith/videoInfo.csv');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let channelIdIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the 'channelID' column
        const headers = line.split(',');
        channelIdIndex = headers.indexOf('channelID');

        if (channelIdIndex === -1) {
            console.error('Required column "channelID" not found in the CSV');
            rl.close();
            return;
        }
        
        isFirstLine = false;
    } else {
        // Process each line after the header
        const columns = line.split(',');
        const channelID = columns[channelIdIndex];

        if (!uniqueChannels.has(channelID)) {
            uniqueChannels.add(channelID);
            counter++;
            if (counter % 1000 === 0) {
                console.log(counter);
            }
        }

        
    }
});

rl.on('close', () => {
    console.log(`Number of unique channels: ${uniqueChannels.size}`);
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});