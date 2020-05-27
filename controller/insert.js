const express = require('express');
const bodyparser = require('body-parser');
const insert = express.Router();
const notify = express.Router();
const verify = express.Router();
const updateProfile = express.Router();
const showProfile = express.Router();
const path = require('path');
const notificationData = require('../model/notify');
const Post1 = require('../model/insert');
const Profile = require('../model/profile');
const {uniqueEmail,uniqueEmail1} = require('./externalFunctions');
global.email = undefined;

insert.use(bodyparser.urlencoded({extended:true}));
insert.post('/',(req,res) => {
    const em = req.body.email;
    uniqueEmail(em).then((result)=>{
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
    email = req.body.email;
    const pass = req.body.pass;
    const post = Post1.findOne({email:email}).select();
    post.then((post) => {
        if(post.password==pass){
            res.sendFile(path.resolve('./Apps/profile.html'));
        }
        else{
            res.json({
                Error : 401,
                Message : "Enter correct password"
            });
        }
    }).catch( (err) => {
        res.json({
            error : 401,
            Message : "Enter valid email or Proceed to sign up"
        });
    })
})
updateProfile.use(bodyparser.urlencoded({extended:true}));
updateProfile.post('/',(req,res) => {
    const mail = email;
    uniqueEmail1(mail).then((result) => {
        const input = {
            email : mail,
            rollnumber : req.body.rollnumber,
            dob : req.body.dob,
            college : req.body.college,
            yearOfPassing : req.body.yearOfPassing,
            cgpa : req.body.cgpa
        }
        const post = new Profile(input);
        post.save((err,result)=>{
            if(err){
                res.json({
                    error : err
                })
            }
            res.sendFile(path.resolve("./Apps/showProfile.html"));
        })

    }).catch((error) => {
        return res.json({
            message : "You already have a Updated Profile!! Click Show Profile or Home"
        })
    });
});

showProfile.use(bodyparser.urlencoded({extended:true}));
showProfile.get('/',(req,res) => {
    // email="dharan@gmail.com"
    function respond(result,proRes){
        var html = "<html>";
        html += "<head><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\" integrity=\"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\" crossorigin=\"anonymous\"></head><body>";
        html += "<style>.navbar {height: 90px;background-color: #333; color: whitesmoke;margin-bottom: 15px;text-align: center;font-size: 30px;display: flex;justify-content: center;align-items: center;}</style>";
        html += "<h6 class=\"navbar\">Personal Detail</h6>"
        html += "<div style=\"margin-top:3%;margin-left:39%;margin-right:30%;font-size:25px;\"><label>Name            : "+result.firstname+" "+result.lastname+"</label><br>";
        html += "<label>Roll Number     : "+proRes.rollnumber+"</label><br>";
        html += "<label>Date of Birth   : "+proRes.dob+"</label><br>";
        html += "<label>College         : "+proRes.college+"</label><br>";
        html += "<label>Year of Passing : "+proRes.yearOfPassing+"</label><br>";
        html += "<label>CGPA            : "+proRes.cgpa+"</label><br></div>";
        html += "<ul class=\"nav justify-content-center\" style=\"margin-left:10%; margin-right: 10%; margin-top: 2%;font-size:25px;\"><li class=\"nav-item\"><a class=\"nav-link active\"href=\"/home\">HOME</a></li><li class=\"nav-item\"><a class=\"nav-link active\"href=\"/profile\">BACK</a></li></ul>";
        html += "</body></html>";
        return (html);
    }
    const post = Post1.findOne({email:email}).select();
    const profile = Profile.findOne({email : email}).select();
    post.then((result) => {
        profile.then((proRes) => {
            res.send(respond(result,proRes));

        })
    });
});

notify.use(bodyparser.urlencoded({extended:true}));
notify.get('/',(req,res) => {
    const general = "generalToAll";
    const gen = notificationData.findOne({email : general}).select();
    global.comp = "";
    gen.then((com1,err1) => {
        function respond(data){
            comp+="<h3>"+data.title+"</h3><h6>"+data.detail+"</h6><hr>"
        }
        if(err1){
            res.json({
                Message : "Currently no notification availabel!!"
            });
        }
        else{
            const common = notificationData.find({email:email}).select();
            common.then((com,err) => {
                if(err){
                    res.json({
                        Error : 401,
                        Message : "Currently no notification availabel!!"
                    });
                }
                else{
                    comp+="<html><head></head><body>"
                    comp+="<h1>General Notification</h1>"
                    if(com1.length){
                        for(let i=0;i<com1.length;i++){
                            respond(com1[i]);
                        }
                    }
                    else{
                        respond(com1);
                    }
                    comp+="<h1>Specified Notification</h1>"
                    if(com.length){
                        for(let i=0;i<com.length;i++){
                            respond(com[i]);
                        }
                    }
                    else{
                        respond(com);
                    }
                    comp+="</body></html>"
                    res.send(comp);
                }
            })
        }
    })
})
module.exports = {
    insert,verify,updateProfile,showProfile,notify
}
