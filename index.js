const express = require('express');
const app = express();
const {insert,verify,updateProfile} = require('./controller/insert');
const {showProfile,notify,updateCompletedCourse} = require('./controller/insert');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
// const io = require('socket.io');
dotenv.config();

// io.on('connection', function(socket) {
//     console.log('A user connected');
 
//     socket.on('disconnect', function () {
//        console.log('A user disconnected');
//     });
//  });
 
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
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/insert',insert);
app.use('/verify',verify);
app.use('/updateProfile',updateProfile);
app.use('/showProfile',showProfile);
app.use('/notify',notify);
app.use('/updateCompletedCourse',updateCompletedCourse)
app.listen(process.env.PORT || 4000);