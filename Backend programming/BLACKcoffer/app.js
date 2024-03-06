const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const allData = require("./init/urldata.js");
const path = require("path");
const article = require("./model/index.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


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

app.get("/",async(req,res)=>{
    res.send("working"); 
})


/*app.get("/article",(req,res)=>{
   // console.log(allData);    // printing excel data//
   // res.send(data);
    const urlIds = allData.map(item => item.URL);
   // console.log(urlIds);
    res.render("index.ejs",{allData});
});
*/

app.get("/articles",async(req,res)=>{
    let allArticle = await article.find({});
    res.render("index.ejs",{allArticle});
});


app.get("/articles/:id",async(req,res)=>{
    //res.send("working");
    let {id} = req.params;
    const articleInfo =  await article.findById(id);
    res.render("show.ejs",{articleInfo});
    console.log(articleInfo);
})

app.listen(8080,()=>{
    console.log("port is listenig on port 8080");
});

