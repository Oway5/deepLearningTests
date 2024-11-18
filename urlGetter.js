// js file that takes all the ids from from the csv(that match requirements) and changes them into links
// then saves them to multiple txt files each with up to 100 links of form https://www.youtube.com/watch?v={id}
// Must have over 50 votes under the 'votes' header
// Must have either have 'sponsor' or 'selfpromo' under the 'category' header
// save to ./scriptingData/
const fs = require('fs');
const readline = require('readline');

const links = []; // Array to store the YouTube links

// Create a readable stream for sponsorTimes.csv
const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let voteIndex = -1;
let videoIdIndex = -1;
let categoryIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the 'votes', 'videoID', and 'category' columns
        const headers = line.split(',');
        voteIndex = headers.indexOf('votes');
        videoIdIndex = headers.indexOf('videoID');
        categoryIndex = headers.indexOf('category');

        if (voteIndex === -1 || videoIdIndex === -1 || categoryIndex === -1) {
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
        const category = columns[categoryIndex];

        if (!isNaN(votes) && votes > 50 && (category === 'sponsor' || category === 'selfpromo')) {
            const link = `https://www.youtube.com/watch?v=${videoID}`;
            links.push(link);
        }
    }
});

rl.on('close', () => {
    // Save the links to multiple text files, each with up to 100 links
    const chunkSize = 100;
    for (let i = 0; i < links.length; i += chunkSize) {
        const chunk = links.slice(i, i + chunkSize);
        const fileName = `./scriptingData/links_${Math.floor(i / chunkSize) + 1}.txt`;
        fs.writeFile(fileName, chunk.join('\n'), (err) => {
            if (err) {
                console.error(`Error writing to file ${fileName}:`, err);
            } else {
                console.log(`Links saved to ${fileName}`);
            }
        });
    }
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});