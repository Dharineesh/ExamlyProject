require('../db');
const mongoose = require('mongoose');
const notify = new mongoose.Schema({
    email : {
        type : String,
        required : true
    } ,
    title : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('notificationData',notify);