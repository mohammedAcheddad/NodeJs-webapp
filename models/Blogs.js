const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    date: String
});

const Blog=mongoose.model("blogs",blogSchema)

module.exports={blogschema:blogSchema,Blog:Blog}