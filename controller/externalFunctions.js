const isset = require('isset');
const Post1 = require('../model/insert');
const Profile = require('../model/profile');

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

module.exports.uniqueEmail1 = (email) =>{
    return new Promise((resolve,reject)=>{
        Profile.findOne({email : email},(email_err,email_result)=>{
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