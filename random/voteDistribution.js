const fs = require('fs');
const readline = require('readline');

const voteCounts = {}; // Object to store the distribution of votes

// Create a readable stream
const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let voteIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the 'votes' column
        const headers = line.split(',');
        voteIndex = headers.indexOf('votes');

        if (voteIndex === -1) {
            console.error('votes column not found in the CSV');
            rl.close();
            return;
        }
        
        isFirstLine = false;
    } else {
        // Process each line after the header
        const columns = line.split(',');
        const votes = parseInt(columns[voteIndex], 10);

        if (!isNaN(votes)) {
            voteCounts[votes] = (voteCounts[votes] || 0) + 1;
        }
    }
});

rl.on('close', () => {
    console.log('Vote distribution:', voteCounts);
    fs.writeFile('./dataFound/voteDistribution.txt', JSON.stringify(voteCounts, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Vote distribution saved to voteDistribution.txt');
        }
    });
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});
