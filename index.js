const express = require('express');
const app = express();
const {insert,verify} = require('./controller/insert');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
app.get('/',(req,res)=>{
    res.sendfile("index.html");
})

app.get('/registration',(req,res) => {
    res.sendfile("./registration.html");
})
app.get('/home',(req,res) => {
    res.sendfile("./home.html")
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/insert',insert);
app.use('/verify',verify);

app.listen(4000);
