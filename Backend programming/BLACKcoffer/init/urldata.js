const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');
const allData = require('./urldata.js');
const value = allData.map(item => item.URL);


async function extractDataFromUrl(url) {
  try {
      // Fetch HTML content from the URL
      const response = await axios.get(url);

      // Load HTML content into Cheerio
      const $ = cheerio.load(response.data);

      // Extract text content from the entire webpage
      const textContent = $('body').text();

      return textContent;
  } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return null;
  }
}

// Read Excel file to get URLs
const workbook = xlsx.readFile('input.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// Extract data from each URL
async function extractDataFromUrls() {
  for (const item of data) {
      const url = item.URL; // Assuming the column name containing URLs is 'URL'
      try {
          const textContent = await extractDataFromUrl(url);
          if (textContent) {
              console.log('Text content extracted from the webpage:', textContent);
          } else {
              console.log('Failed to extract text content from the webpage.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
}

// Execute function to extract data from URLs
extractDataFromUrls();

/*
// Read Excel file
const workbook = xlsx.readFile('input.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// MongoDB connection string
const url = 'mongodb://localhost:27017';
const dbName = 'blackcoffer';
const collectionName = 'article';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Insert data in MongoDB
  collection.insertMany(data, (err, result) => {
    if (err) throw err;
    console.log(`${result.insertedCount} documents inserted into MongoDB.`);
    client.close();
  });
});
console.log(data);     // print data //


//const allData = data;
module.exports= {allData :data}    // export url data//

*/