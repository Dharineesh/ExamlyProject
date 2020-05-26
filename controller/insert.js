const express = require('express');
const bodyparser = require('body-parser');
const insert = express.Router();
const verify = express.Router();
const updateProfile = express.Router();
const path = require('path');
const Post1 = require('../model/insert');
const Profile = require('../model/profile');
const {uniqueEmail} = require('./externalFunctions');

insert.use(bodyparser.urlencoded({extended:true}));
insert.post('/',(req,res) => {
    const email = req.body.email;
    uniqueEmail(email).then((result)=>{
        const post = new Post1(req.body);
        post.save(function(err,result){
            if(err){
                return res.status(400).json({
                    error : err
                });
            }
            res.status(200).sendFile(path.resolve('./index.html'));
        });
    }).catch((error) =>{
        return res.json({
            status : 401,
            message : "Email already taken"
        });
    });
});

verify.use(bodyparser.urlencoded({extended:true}));
verify.post('/',(req,res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const post = Post1.findOne({email:email}).select();
    post.then((post) => {
        if(post.password==pass){
            res.sendFile(path.resolve('./Apps/profile.html'));
        }
        else{
            res.json({
                Error : 401,
                Message : "Enter the correct password"
            });
        }
    }).catch( (err) => {
        console.log(err);
    });
})
module.exports = {
    insert,verify,updateProfile
}

updateProfile.use(bodyparser.urlencoded({extended:true}));
updateProfile.post('/',(req,res) => {
    
})