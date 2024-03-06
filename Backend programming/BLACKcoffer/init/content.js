/*const { MongoClient } = require('mongodb');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const axios = require('axios');
const article = require("../model/index.js");
const mongoose = require("mongoose");
const data = require("./urldata.js")

const value = data.allData.map(item => item.URL);
//console.log(value);            // URL

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
    console.log("db err")
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blackcoffer");
}

    // Iterate through each URL in the data
    async function extractDataFromUrl(url) {
        try {
            // Fetch HTML content from the URL
            const response = await axios.get(url);
    
            // Load HTML content into Cheerio
            const $ = cheerio.load(response.data);
    
            // Extract text content from the webpage
            const textContent = $('body').text();
    
            return textContent;
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            return null;
        }
    }
    
    // Example usage:
    const url =  article.findOne({value});
    // console.log(urlIds);
    extractDataFromUrl(url)
        .then(textContent => {
            if (textContent) {
                console.log('Text content extracted from the webpage:', textContent);
            } else {
                console.log('Failed to extract text content from the webpage.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

console.log(value);*/









const { MongoClient } = require('mongodb');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const axios = require('axios');
const article = require("../model/index.js");
const mongoose = require("mongoose");
const data = require("./urldata.js")

const value = data.allData.map(item => item.URL);

main()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
        console.log("db err");
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/blackcoffer");

    // Iterate through each URL in the data
    for (const url of value) {
        try {
            // Fetch URL from the database
            const document = await article.findOne({ URL: url });
            if (!document) {
                console.log(`Document not found for URL: ${url}`);
                continue; // Skip to the next URL
            }

            // Extract data from the URL
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

// Example usage:
const url = "https://example.com"; // Replace with your URL
extractDataFromUrl(url)
    .then(textContent => {
        if (textContent) {
            console.log('Text content extracted from the webpage:', textContent);
        } else {
            console.log('Failed to extract text content from the webpage.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
