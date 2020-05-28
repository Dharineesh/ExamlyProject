require('../db');
const mongoose = require('mongoose');

module.exports = mongoose.model("CompletedCourse",{
    current : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    name : {
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