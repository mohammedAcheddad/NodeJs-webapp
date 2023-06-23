const mongoose= require('mongoose')
const express = require('express')
const session = require('express-session')
const { UserRouter } = require('./routes/users');
const { blogsRouter } = require('./routes/blogs');

//mongodb

mongoose.connect
("mongodb+srv://Nour2001:Nour2001@test.yse8l4k.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err))




//express
const app=express();

app.use(express.static("./public"))

//middleware to parse json data on body request
app.use(express.json())

// injection du middleware des sessions
app.use(session({
    secret: "cheddad 2019",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly:true }
  }))


app.use('/users',UserRouter)

// check authentification (gard / interceptor)
app.use((req,res,next)=>{

    if(!req.session.login)
        return res.status(403).json({message:"you need to login first"})
    next();
})

app.use('/blogs',blogsRouter)

const port =30000
app.listen(port, ()=>{
    console.log('server listening on port : ',port)
})