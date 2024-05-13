//Date Modified: 5/2/24
//This file is meant to retrieve blog files from the mongoose database
//For example. When the blogs site is being called, the server connects to DB, retrieves blog collection, displays blogs

const express = require('express');
const app = express();
//const path = require('path');
const Blog = require('./models/blog');
const mongoose = require('mongoose');
require('dotenv').config();
const userPass = process.env.MONGODB_PASS;
let successMSG;

//accessing database
const dbURI = `mongodb+srv://isiahianabad:${userPass}@zaynamations.f05jlxu.mongodb.net/zaynamationsDB?retryWrites=true&w=majority&appName=zaynamations`;

//middleware
app.use(express.urlencoded({extended: true}));

mongoose.connect(dbURI)
.then((result)=>{
    //successMSG = true;
    app.listen(5000);

})
.catch((err) => {
    console.log(err);
});

//get pages
app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        //render the view
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

//rendering one blog
app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        //send one blog back
        console.log(result);
        res.send(result);
        
    })
    .catch(err =>{
        console.log(err);
    })
});

//creating a new blog
app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then(result=>{
        res.redirect('/blogs')
    })
});

//deleting a blog 
app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect: '/blogs'});
        //res.redirect('/blogs');
    })
    .catch(err =>{
        console.log(err);
    })
});



app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});

