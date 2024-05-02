const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//store images using Amazon S3 o MongoDB?
const blogSchema = Schema({

    title: {
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },

}, {timestamps: true});

//this is a way to interact with the database using the model, created by the structure
//pluralizes when searching
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;