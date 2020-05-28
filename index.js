const express = require('express');
// import express from 'express';
// import insert from './controller/insert.js';
// import verify from './controller/insert.js';
// import updateProfile from './controller/insert.js';
// import showProfile from './controller/insert.js';
// import notify from './controller/insert.js'
// import bodyparser from 'body-parser';
// import dotenv from 'dotenv';
const app = express();
const {insert,verify,updateProfile} = require('./controller/insert');
const {showProfile,notify} = require('./controller/insert');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
app.get('/',(req,res)=>{
    res.sendfile("index.html");
})

app.get('/registration',(req,res) => {
    res.sendfile("./Apps/registration.html");
})
app.get('/home',(req,res) => {
    res.sendfile("./Apps/homePage.html");
})
app.get('/profile',(req,res) => {
    res.sendfile("./Apps/profile.html")
})
// app.get('/showProfile/home',(req,res) => {
//     res.sendFile("./homePage.html");
// })
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/insert',insert);
app.use('/verify',verify);
app.use('/updateProfile',updateProfile);
app.use('/showProfile',showProfile);
app.use('/notify',notify);
app.listen(process.env.PORT || 4000);