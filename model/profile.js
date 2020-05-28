require('../db');
const mongoose = require('mongoose');
const UpdateSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    rollnumber : {
        type : Number,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    college : {
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
});

module.exports = mongoose.model('Profile',UpdateSchema);