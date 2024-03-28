

const { faker } = require("@faker-js/faker");
const mysql= require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4:uuidv4}= require('uuid');


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"*******",
});

let getRandomUser = () =>{
    return[
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};


//home route
let q = "SELECT count(*) FROM user"; 
app.get("/",(req,res)=>{
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
     } catch(err){
            console.log(err);
            res.send("some err in db");
     }
})


//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id ='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user});
            console.log(result);
        });
     } catch(err){
            console.log(err);
            res.send("some err in db");
     }
})


//Update route
app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password: formPass , username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            if (formPass !== user.password){
                res.send("WRONG PASSWORD");
            }
            else{
                 let q2 = `UPDATE user SET username='${newUsername}'WHERE id='${id}'`;
                 connection.query(q2,(err,result)=>{
                    if (err) throw err;
                    res.redirect("/user");
                })
            }
        });
    }catch(err){
        console.log(err);
        res.send("some err in db");
    }
})


//show user
app.get("/user",(req,res)=>{
    let q = "SELECT * FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.render("show.ejs",{result});
        });
     } catch(err){
            console.log(err);
            res.send("some err in db");
     }
});


//new route
app.get("/user/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/user/new",(req,res)=>{
    let {username,email,password} = req.body;
    let id = uuidv4();
    let q = `INSERT INTO user (id,username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log("added user");
            res.redirect("/user")
        });
     } catch(err){
            console.log(err);
            res.send("some err in db");
     }
});

//delete route.
app.get("/user/:id/delete",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id= '${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if (err) throw err;
            let user = result[0];
            res.render("delete.ejs",{user});
            console.log(result);
        })
    }catch(err){
        res.send("error in db");
    }
});


//delete the data
app.delete("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password} = req.body;

    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if (err) throw err;
            let user = result[0];

            if(user.password !== password){
                res.send("wrond password");
            }
            else{
                let q2 = `DELETE FROM user WHERE id = '${id}'`;
                    connection.query(q2,(err,result)=>{
                        if(err) throw err;
                        console.log(result);
                        console.log("deleted");
                        res.redirect("/user");
                    })
                
            }
        })
    }catch(err){
        console.log("db error");
    }
})

app.listen(8080,()=>{
    console.log("app is listening...");
});











