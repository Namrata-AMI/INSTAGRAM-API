

//  doubt solved by TA //



const express = require("express");
const app = express();
const {faker} = require("@faker-js/faker");
//const mysql = require("mysql2");

//const {v4:uuidv4}  = require("uuid");

const connection = mysql.createConnection({             
host:"localhost",
user:"root",
database:"delta_app",
password:"NTAMJV18115",
});                                 

try{                                                   
    connection.query("SHOW TABLES",(err,result)=>{
        if (err) {throw err};
        console.log(result);
    });
} catch(err){
    console.log(err);
};                           

let getUser = () =>{
    let obj ={
       id: faker.string.uuid(),
      username: faker.internet.userName(),
       email :faker.internet.email(),
       pass: faker.internet.password(),
};
return obj;
};

console.log(getUser());

app.listen(8080,()=>{
    console.log("app is listening..")
});




