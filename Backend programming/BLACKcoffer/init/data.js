const mongoose = require("mongoose");
const initData = require("./urldata.js");
const article = require("../model/index.js");

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
    console.log("db err")
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blackcoffer");
};


const initDB = async()=>{                             //initialising db//
    await article.deleteMany({});                     // first empty the db before initilaise//
    await article.insertMany(initData.allData);           // then inserting data to db//
    console.log("data was initialised");
    console.log(allData);
}
initDB();