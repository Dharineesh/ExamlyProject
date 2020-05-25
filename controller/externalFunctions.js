const isset = require('isset');
const Post1 = require('../model/insert');

module.exports.uniqueEmail = (email) =>{
    return new Promise((resolve,reject)=>{
        Post1.findOne({email : email},(email_err,email_result)=>{
            if(isset(email_err)&&!empty(email_err)){
                reject(Error.database_error());
            }
            else{
                if(isset(email_result)&&!empty(email_result)){
                    reject(Error.invalid_error(messageString.email_exists));
                }
                else{
                    resolve(email);
                }
            }
        });
    });
};