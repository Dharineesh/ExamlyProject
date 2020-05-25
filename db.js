const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URL,{ 
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