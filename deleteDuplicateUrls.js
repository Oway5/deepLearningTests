//quick js script that goes through everything in ./scriptingData/urls/ and deletes all duplicate lines
const fs = require('fs');
const path = require('path');

const directoryPath = './scriptingData/urls/';

// Function to read lines from a file and remove duplicates
const removeDuplicateLines = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
            const uniqueLines = Array.from(new Set(lines));
            resolve(uniqueLines.join('\n'));
        });
    });
};

// Function to process each file
const processFile = async (filePath) => {
    try {
        const uniqueContent = await removeDuplicateLines(filePath);
        fs.writeFile(filePath, uniqueContent, (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
            } else {
                console.log(`Processed file: ${filePath}`);
            }
        });
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
};

// Read the directory and process each file
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory:', err);
    }

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        processFile(filePath);
    });
});