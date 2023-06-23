const { default: mongoose } = require("mongoose");
const { blogschema } = require("./Blogs");

const schema= new mongoose.Schema({
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
    blogs:[blogschema]
})
const User=mongoose.model("users",schema)
module.exports.User=User