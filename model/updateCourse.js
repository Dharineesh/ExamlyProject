require('../db');
const mongoose = require('mongoose');

module.exports = mongoose.model("CompletedCourse",{
    email : {
        type : String,
        required : true
    },
    course1 : {
        type : String
    },
    course2 : {
        type : String
    },
    course3 : {
        type : String
    }
});