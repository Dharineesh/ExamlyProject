const express = require('express');
const showProfile = express.Router();
const bodyparser = require('body-parser');

showProfile.use(bodyparser.urlencoded({extended : true}))
showProfile.get('/',(req,res) => {
    
});

module.exports = showProfile;