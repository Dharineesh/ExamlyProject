require('../db');
const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
    rollnumber : {
        type : Number,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    collegeName : {
        type : String,
        required : true
    },
    yearOfPassing : {
        type : Number,
        required : true
    },
    cgpa : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model('Profile',UpdateSchema);