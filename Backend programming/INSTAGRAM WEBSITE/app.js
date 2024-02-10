const express = require("express");
const app = express();
const port = 8080;
const path= require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","views");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));

let posts = [
    {
        id:uuidv4(),
        username:"THV",
        content: "다녀오겠습니다🙇🏻🫶",
        image:"https://www.allkpop.com/upload/2023/04/content/101058/1681138727-20230410000623-0.jpg"
    },
    {
        id:uuidv4(),
        username:"suga",
        content: "have fun !!!!1",
        image:"https://img.veenaworld.com/wp-content/uploads/2022/04/Korean-Food.jpg"
    },
    {
        id:uuidv4(),
        username:"j.m",
        content: "Preparing  for tonight concert",
        image:"https://res.heraldm.com/content/image/2019/10/25/20191025000511_0.jpg"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content,image} = req.body;
    let id = uuidv4();
    posts.push({id,username,content,image});
    res.redirect("/posts");
    console.log("request received.");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.body;
    const NewContent = req.body.content;
    let post = posts.find((p) => id === p.id);   // sending request to update content//
    post.content = NewContent;
    console.log(post);
    res.redirect("/posts"); 
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);  // receiving request on this page to edit//
    console.log(post);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=> id===p.id);
    console.log("deleted");
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
});


