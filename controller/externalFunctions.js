const isset = require('isset');
const Post1 = require('../model/insert');

module.exports.uniqueEmail = (email) =>{
    return new Promise((resolve,reject)=>{
        Post1.findOne({email : email},(email_err,email_result)=>{
            if(email_err!=null){
                reject(Error.database_error());
            }
            else{
                if(email_result!=null){
                    reject();
                }
                else{
                    resolve(email);
                }
            }
        });
    });
};