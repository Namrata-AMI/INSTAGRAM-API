const fs = require('fs');

// Read text file
const filePath = 'negative-words.txt';               //name of file
const textData = fs.readFileSync(filePath, 'utf8');    
 
// Split text into lines
const lines = textData.split('\n');

// Prepare data as an array of objects
const jsonData = lines.map(line => {
    const values = line.split(','); // Assuming values are separated by commas
    const obj = {};
    // Assuming the text file has fixed structure like key-value pairs
    obj.key1 = values[0];
    obj.key2 = values[1];
    // Add more key-value pairs as needed
    
    return obj;
});

// Write JSON data to a file
const jsonFilePath = 'negative-word.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

console.log('JSON file created successfully:', jsonFilePath);
