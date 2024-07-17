const app = require("./app");
const dotenv= require("dotenv");
const path = require("path");
const cloudinary = require('cloudinary');
const express = require("express");

dotenv.config({path:'./config/config.env'});


// handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.messgae}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    process.exit(1);
})
cloudinary.config({
  cloud_name: "drputjjgj",
  api_key: "193181991474174",
  api_secret: "vBwyL4zxAElrn-buiLHTkuY0C7k",
});

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/build"));
})


require('../backend/config/database');

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`)
})