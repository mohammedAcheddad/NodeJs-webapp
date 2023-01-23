"use strict";
const express = require("express");
const mongoose= require('mongoose')
const session = require('express-session')
const dotenv = require("dotenv");
const { UserRouter } = require('./routes');
const { MemosRouter } = require('./routes');

const app = express();
app.use(express.json())
app.use(express.static("./public"))

mongoose.connect
("mongodb+srv://icemed700:tcYUr8l87NHkwVuS@testnode.qe06emk.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err))

app.use(session({
    secret: "uemf 2022",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly:true }
  }))

app.use('/users',UserRouter)


app.use('/memos',MemosRouter)


app.use((req,res,next)=>{

    if(!req.session.login)
        return res.status(403).json({message:"you need to login first"})
    next();
})

app.listen(3000, (err)=>{
    if (err) console.log(err)
    console.log('listening on port 3000')
})


