require('../db')
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    }
});

module.exports = mongoose.model('Post1',Schema);