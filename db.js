const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect("mongodb+srv://goodtimes_pass:Passwordno1!@cluster0-ittto.mongodb.net/test?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
 });

const db = mongoose.connection;

db.on('error',(err) => {
    console.log(`Error : ${err.message}`);
});

db.once('open', () => {
    console.log("DB connected");
})

     
module.exports = db;