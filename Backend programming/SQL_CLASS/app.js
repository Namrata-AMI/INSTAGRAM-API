// ta//

const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const connection =  mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password:"*****",
      });


      function getRandomUser(){
        let data = {
            id : faker.string.uuid(),
            username : faker.internet.userName(),
            email : faker.internet.email(),
        };
        return data;
    };

    app.get("/",(req,res)=>{
      res.send("server working well!");
    });

    app.post("/add",(req,res)=>{
      let data = getRandomUser();
      console.log(data);
      let d =[data.id,data.username,data.email];
      let q = "INSERT INTO stud VALUES(?,?,?)";
    });

    let stud = ["1323","anuj","anuj@gmail.com"];
    
      try{
        connection.query(q,d, (err,res) =>{ 
          if (err) {throw err;}
          res.send("hello");
        });
      } catch(err){
        console.log("db err");
        console.log(err);
      };


app.listen(8080,()=>{
   console.log("app is listening..");
});