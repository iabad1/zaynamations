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
    res.redirect('/blog');
});

app.get('/blog', (req, res)=>{
    Blog.find()
    .then((result)=>{
        //render the view
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.use((req, res)=>{
    res.status(404).send('./views');
});
//create error page

//module.exports = connectToMongoDB.apply();
//export default successMSG;
/*

//routing
console.log('Before html');
app.get('/', (req, res)=>{
    res.redirect('/blogs');
})
app.get('/blogs', (req, res)=>{
    //respond with page
    console.log('In middleware');
    res.sendFile('blogs.html', {root: path.join(__dirname,'/files')});
});
*/

