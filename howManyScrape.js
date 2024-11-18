// console.time('uniqueChannels');

// const fs = require('fs');
// const readline = require('readline');
// const { start } = require('repl');

// const voteCounts = {}; // Object to store the distribution of votes
// const uniqueOver50VideoIds = new Set(); // Set to store unique video IDs with > 50 votes
// const uniqueChannelIds = new Set(); // Set to store unique channel IDs
// const avgTime = 0;

// // Create a readable stream for sponsorTimes.csv
// const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

// const rl = readline.createInterface({
//     input: stream,
//     crlfDelay: Infinity,
// });

// let isFirstLine = true;
// let voteIndex = -1;
// let videoIdIndex = -1;

// rl.on('line', (line) => {
//     if (isFirstLine) {
//         // Process header line to find the 'votes' and 'videoID' columns
//         const headers = line.split(',');
//         voteIndex = headers.indexOf('votes');
//         videoIdIndex = headers.indexOf('videoID');

//         if (voteIndex === -1 || videoIdIndex === -1) {
//             console.error('Required columns not found in the CSV');
//             rl.close();
//             return;
//         }
        
//         isFirstLine = false;
//     } else {
//         // Process each line after the header
//         const columns = line.split(',');
//         const votes = parseInt(columns[voteIndex], 10);
//         const videoID = columns[videoIdIndex];
//         const startTime = parseInt(columns[startTimeIndex], 10);
//         const endTime = parseInt(columns[endTimeIndex], 10);
        
//         if(!isNaN(startTime) && !isNaN(endTime)){
//             avgTime += (endTime - startTime);
//         }

//         if (!isNaN(votes)) {
//             // Count votes for distribution
//             voteCounts[votes] = (voteCounts[votes] || 0) + 1;

//             // If votes > 50, add the videoID to the unique set
//             if (votes > 50) {
//                 uniqueOver50VideoIds.add(videoID);
//             }
//         }
//     }
// });

// rl.on('close', () => {
//     // Create a readable stream for videoInfo.csv
//     const videoInfoStream = fs.createReadStream('../toMessWith/videoInfo.csv'); // replace with your actual file path

//     const rlVideoInfo = readline.createInterface({
//         input: videoInfoStream,
//         crlfDelay: Infinity,
//     });

//     let isFirstLineVideoInfo = true;
//     let videoIdIndexVideoInfo = -1;
//     let channelIdIndex = -1;
//     let startTimeIndex = -1;
//     let endTimeIndex = -1;

//     rlVideoInfo.on('line', (line) => {
//         if (isFirstLineVideoInfo) {
//             // Process header line to find the 'videoID' and 'channelID' columns
//             const headers = line.split(',');
//             videoIdIndexVideoInfo = headers.indexOf('videoID');
//             channelIdIndex = headers.indexOf('channelID');
//             startTimeIndex = headers.indexOf('startTime');
//             endTimeIndex = headers.indexOf('endTime');

//             if (videoIdIndexVideoInfo === -1 || channelIdIndex === -1 || startTimeIndex === -1 || endTimeIndex === -1) {
//                 console.error('Required columns not found in the CSV');
//                 rlVideoInfo.close();
//                 return;
//             }

//             isFirstLineVideoInfo = false;
//         } else {
//             // Process each line after the header
//             const columns = line.split(',');
//             const videoID = columns[videoIdIndexVideoInfo];
//             const channelID = columns[channelIdIndex];
//             const startTime = columns[startTimeIndex];
//             const endTime = columns[endTimeIndex];

//             if (uniqueOver50VideoIds.has(videoID)) {
//                 uniqueChannelIds.add(channelID);
//             }
//         }
//     });

//     rlVideoInfo.on('close', () => {
//         console.log(`Total unique video IDs with more than 50 votes: ${uniqueOver50VideoIds.size}`);
//         console.log(`Total unique channel IDs: ${uniqueChannelIds.size}`);
//         console.timeEnd('uniqueChannels');
//         //save unique channel ids to a txt
//         fs.writeFile('./dataFound/uniqueChannelIds.txt', Array.from(uniqueChannelIds).join('\n'), (err) => {
//             if (err) {
//                 console.error('Error writing to file:', err);
//             } else {
//                 console.log('Unique channel IDs saved to uniqueChannelIds.txt');
//             }
//         });
//     });
    
    

//     rlVideoInfo.on('error', (err) => {
//         console.error('Error reading the file:', err);
//     });
// });

// rl.on('error', (err) => {
//     console.error('Error reading the file:', err);
// });
console.time('uniqueChannels');

const fs = require('fs');
const readline = require('readline');

const voteCounts = {}; // Object to store the distribution of votes
const uniqueOver50VideoIds = new Set(); // Set to store unique video IDs with > 50 votes
const uniqueChannelIds = new Set(); // Set to store unique channel IDs
let totalDuration = 0; // Variable to store the total duration of segments with > 50 votes
let segmentCount = 0; // Variable to store the count of segments with > 50 votes

// Create a readable stream for sponsorTimes.csv
const stream = fs.createReadStream('../toMessWith/sponsorTimes.csv'); // replace with your actual file path

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let isFirstLine = true;
let voteIndex = -1;
let videoIdIndex = -1;
let startTimeIndex = -1;
let endTimeIndex = -1;

rl.on('line', (line) => {
    if (isFirstLine) {
        // Process header line to find the 'votes', 'videoID', 'startTime', and 'endTime' columns
        const headers = line.split(',');
        voteIndex = headers.indexOf('votes');
        videoIdIndex = headers.indexOf('videoID');
        startTimeIndex = headers.indexOf('startTime');
        endTimeIndex = headers.indexOf('endTime');

        if (voteIndex === -1 || videoIdIndex === -1 || startTimeIndex === -1 || endTimeIndex === -1) {
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
        const startTime = parseInt(columns[startTimeIndex], 10);
        const endTime = parseInt(columns[endTimeIndex], 10);
        
        if (!isNaN(startTime) && !isNaN(endTime) && !isNaN(votes)) {
            const duration = endTime - startTime;
            if (votes > 50) {
                uniqueOver50VideoIds.add(videoID);
                totalDuration += duration;
                segmentCount++;
            }
        }
    }
});

rl.on('close', () => {
    // Create a readable stream for videoInfo.csv
    const videoInfoStream = fs.createReadStream('../toMessWith/videoInfo.csv'); // replace with your actual file path

    const rlVideoInfo = readline.createInterface({
        input: videoInfoStream,
        crlfDelay: Infinity,
    });

    let isFirstLineVideoInfo = true;
    let videoIdIndexVideoInfo = -1;
    let channelIdIndex = -1;

    rlVideoInfo.on('line', (line) => {
        if (isFirstLineVideoInfo) {
            // Process header line to find the 'videoID' and 'channelID' columns
            const headers = line.split(',');
            videoIdIndexVideoInfo = headers.indexOf('videoID');
            channelIdIndex = headers.indexOf('channelID');

            if (videoIdIndexVideoInfo === -1 || channelIdIndex === -1) {
                console.error('Required columns not found in the CSV');
                rlVideoInfo.close();
                return;
            }

            isFirstLineVideoInfo = false;
        } else {
            // Process each line after the header
            const columns = line.split(',');
            const videoID = columns[videoIdIndexVideoInfo];
            const channelID = columns[channelIdIndex];

            if (uniqueOver50VideoIds.has(videoID)) {
                uniqueChannelIds.add(channelID);
            }
        }
    });

    rlVideoInfo.on('close', () => {
        const avgTime = segmentCount > 0 ? totalDuration / segmentCount : 0;
        console.log(`Total unique video IDs with more than 50 votes: ${uniqueOver50VideoIds.size}`);
        console.log(`Total unique channel IDs: ${uniqueChannelIds.size}`);
        console.log(`Average time of segments with more than 50 votes: ${avgTime}`);
        console.timeEnd('uniqueChannels');
        // Save unique channel ids to a txt
        fs.writeFile('./dataFound/uniqueChannelIds.txt', Array.from(uniqueChannelIds).join('\n'), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Unique channel IDs saved to uniqueChannelIds.txt');
            }
        });
    });

    rlVideoInfo.on('error', (err) => {
        console.error('Error reading the file:', err);
    });
});

rl.on('error', (err) => {
    console.error('Error reading the file:', err);
});