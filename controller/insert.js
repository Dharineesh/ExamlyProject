const express = require('express');
const bodyparser = require('body-parser');
const insert = express.Router();
const notify = express.Router();
const verify = express.Router();
const updateCompletedCourse = express.Router();
const updateProfile = express.Router();
const showProfile = express.Router();
const path = require('path');
const notificationData = require('../model/notify');
const CompletedCourse = require('../model/updateCourse');
const Post1 = require('../model/insert');
const Profile = require('../model/profile');
const {uniqueEmail,uniqueEmail1} = require('./externalFunctions');
global.email = undefined;
let na = null;

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
                    Message : "Please fill all the fields!!!!"
                })
            }
            res.sendFile(path.resolve("./Apps/profile.html"));
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
        html += "<head><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\" integrity=\"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\" crossorigin=\"anonymous\"></head><body>";
        html += "<style>.navbar {height: 90px;background-color:  #000; color: whitesmoke;margin-bottom: 15px;text-align: center;font-size: 30px;display: flex;justify-content: center;align-items: center;}</style>";
        html += "<h6 class=\"navbar\">Personal Detail</h6>"
        html += "<center><i class=\"fa fa-user\" style=\"font-size:100px;color : burlywood\"></i></center>";
        html += "<div style=\"margin-top:3%;margin-left:39%;margin-right:30%;font-size:25px;\"><label>Name            : "+result.firstname+" "+result.lastname+"</label><br>";
        html += "<label>Roll Number     : "+proRes.rollnumber+"</label><br>";
        html += "<label>Date of Birth   : "+proRes.dob+"</label><br>";
        html += "<label>College         : "+proRes.college+"</label><br>";
        html += "<label>Year of Passing : "+proRes.yearOfPassing+"</label><br>";
        html += "<label>CGPA            : "+proRes.cgpa+"</label><br></div>";
        html += "<ul class=\"nav justify-content-center\" style=\"padding-right:5px; margin-left:5%; margin-right: 5%; margin-top: 2%;font-size:25px;\"><li style=\"padding-right:20px;\" class=\"nav-item\"><a class=\"btn btn-success\"href=\"/home\">HOME</a></li><li class=\"nav-item\"><a class=\"btn btn-primary\"href=\"/profile\">BACK</a></li></ul>";
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
    // email = "dharan@gmail.com";
    const gen = notificationData.findOne({email : general}).select();
    const completed = CompletedCourse.find
    global.comp = "";
    gen.then((com1,err1) => {
        function respond(data){
            comp+="<h2>"+data.title+"</h2><h4>"+data.detail+"</h4><hr>"
        }
        function respond1(data){
            comp +="<h2>"+data.name+"</h2>";
            if(data.course1&&data.course2&&data.course3){
                comp += "<h4>Completed courses in "+data.course1+" "+data.course2+" "+data.course3+"</h4>";   
            }
            else if(data.course1&&data.course2){
                comp += "<h4>Completed courses in "+data.course1+" "+data.course2+"</h4>";
            }
            else if(data.course1&&data.course3){
                comp += "<h4>Completed courses in "+data.course1+" "+data.course3+"</h4>";
            }
            else if(data.course3&&data.course2){
                comp += "<h4>Completed courses in "+data.course3+" "+data.course2+"</h4>";
            }
            else if(data.course1){
                comp += "<h4>Completed courses in "+data.course1+"</h4>";
            }
            else if(data.course2){
                comp += "<h4>Completed courses in "+data.course2+"</h4>";
            }
            else if(data.course3){
                comp += "<h4>Completed courses in "+data.course3+"</h4>";
            }
            else    
                return;
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
                    const  find = CompletedCourse.find({email : "generalToAll"}).select();
                    find.then((com2,err2)=>{
                        // res.send(com2);
                        // if(!com2.length){

                        //     console.log(com2);
                        // }
                        comp+="<html><head><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\" integrity=\"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\" crossorigin=\"anonymous\">";
                        comp+="<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"></head><body style =\"margin-left : 30%;margin-right : 30%; border : 1px solid black;\">"
                        comp += "<style>.navbar {height: 90px;background-color: #333; color: whitesmoke;margin-bottom: 15px;text-align: center;font-size: 30px;display: flex;justify-content: center;align-items: center;}</style>";
                        comp += "<h6 class=\"navbar\">Notification</h6>"
                        comp+="<div style=\"padding : 10px;\"><center><span class=\"fa fa-bell\" style=\"font-size:40px;color:black\"></span><h1 style=\"color : burlywood;\">General</h1></center>"
                        if(com1.length&&com2.length){
                            for(let i=0;i<com1.length;i++){
                                respond(com1[i]);
                            }
                            for(let i=0;i<com2.length;i++){
                                respond1(com2[i]);
                                comp +="<hr>"
                            }
                        }
                        else{
                            if(com1.title==undefined&&!com2.length){
                                comp+="<h2>!!!!!No General Notification!!!!!"
                            }
                            else{
                                respond(com1);
                                for(let i=0;i<com2.length;i++){
                                    respond1(com2[i]);
                                    comp +="<hr>"
                                }
                            }
                        }
                        comp+="<center><h1 style=\"color : burlywood;\">Personal</h1></center>"
                        if(com.length){
                            for(let i=0;i<com.length;i++){
                                respond(com[i]);
                            }
                        }
                        else{
                            if(com.title==undefined){
                                comp+="<h2>!!!!!No Personal Notification!!!!!"
                            }
                            else{
                                respond(com);
                            }
                        }
                        comp+="<center><ul class=\"nav justify-content-center\" style=\"margin-top:5%;font-size:25px;\"><li class=\"nav-item\"><a class=\"btn btn-primary\"href=\"/home\">HOME</a></li><li class=\"nav-item\"></li></ul></center>";
                        comp+="</div></body></html>"
                        res.send(comp);
                    });
                }
            });
        }
    });
});

updateCompletedCourse.use(bodyparser.urlencoded({extended:true}));
updateCompletedCourse.post('/',(req,res) => {
    // email = "dharan@gmail.com";
    const name =Post1.findOne({email : email}).select();
    name.then((body) => {
        na=body.firstname+" "+body.lastname;
        const val = {
            current : email,
            email : "generalToAll",
            name : na,
            course1 : req.body.course1,
            course2 : req.body.course2,
            course3 : req.body.course3
        };
        const post = new CompletedCourse(val);
        const find = CompletedCourse.findOne({current : email,name : na}).select();
        find.then((result,err) => {
            if(err){
                res.json({
                    Error : "Notfound"
                })
            }
            else{
                if(result){
                    CompletedCourse.updateOne({current: email,name : na},{
                        course1 : req.body.course1,
                        course2 : req.body.course2,
                        course3 : req.body.course3
                    }).then((su,er) => {
                        if(er){
                            res.json({
                                Error : er
                            })
                        }
                        res.status(200).sendFile(path.resolve("./Apps/homePage.html"));
                    });
                }
                else{
                    post.save((err,sucess) => {
                        if(err){
                            res.json({
                                Error : err
                            });
                        }
                        res.status(200).sendFile(path.resolve("./Apps/homePage.html"));
                    });
                }
            }
        })
    });
    
})

module.exports = {
    insert,verify,updateProfile,showProfile,notify,updateCompletedCourse
}
