"use strict";
const express = require("express");
const bcrypt=require('bcrypt');
const { default: mongoose } = require("mongoose");


const memoS = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})


const Schema = new mongoose.Schema({
    login:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    memos:[memoS]
})

const Memo=mongoose.model("memos",memoS)
const User=mongoose.model("users",Schema)

const UserRouter = express.Router();

UserRouter.post('/register',async (req,res)=>{
    const {login,pwd,pwd2,name} = req.body;
    console.log(req.body)

    if(!login || !pwd || !pwd2 || !name){
        return res.status(404).json({message:"all fields are required"})
    }

    if(pwd != pwd2){
        return res.status(404).json({message:"passwords doesnt match"})
    }
    let searchExisting = await User.findOne({login:login})
    if(searchExisting){
        return res.status(404).json({message:"login already exists"})
    }

    const CryptedPassword = await bcrypt.hash(pwd,10)

    const nUser = new User({
        login:login,
        pwd:CryptedPassword,
        name:name,
        memos:[]
    })
    nUser.save().then(()=>res.status(201).json({message:"success"})).catch(err=>res.status(500).json({message:err}))
    
})


UserRouter.post("/login", async (req,res)=>{
    const {login,pwd} = req.body;
    const findUser = await User.findOne({login:login});
    if(!findUser){
        res.status(404).json({message:"User doesn't exist"});
    }
    const match  = await bcrypt.compare(pwd,findUser.pwd)
    if(match){
        req.session.login = login;
        return res.status(201).json({message:"login successful"})
    }
    res.status(404).json({message:"wrong password"});
})

UserRouter.post("/logout",async (req,res)=>{
    req.session.destroy();
     res.json({message:'logout success'});
 })


const MemosRouter = express.Router();

MemosRouter.post("",async (req,res)=>{
    const {date , content} = req.body;
    
    if(!date || !content){
        res.status(404).json({message:"uncomplete query"})
    }
    const nMemo = new Memo({
        date:date,
        content:content
    })
    const login = req.session.login
    try{
    const findUser=await User.findOne({login:login});
    const dataMemo =  await nMemo.save()
    findUser.memos.push(dataMemo)
    const data = await findUser.save()
    res.json(data);
    }catch(err){
        res.status(500).send({message:err})
    }

})

MemosRouter.get("", async (req,res)=>{
    const login = req.session.login
     let findUser = await User.findOne({login:login})
    const numbr = req.query.nbr || findUser.memos.length
    const dataBSent = findUser.memos.filter((elem,index)=>index<numbr)
    res.json({dataB:dataBSent});
})


module.exports.MemosRouter = MemosRouter;
module.exports.UserRouter = UserRouter;
