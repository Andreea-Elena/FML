const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const UserAuth  = require('../models/userAuth')(sequelize, Sequelize.DataTypes);

const userAuth={
    create: async(user)=>{
        try {
            const result = await UserAuth.create(user);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getUserById: async(id1)=>{
        try{
            const user= await UserAuth.findOne({
                where:{
                    id: id1
                }
            });
            return user;
        } catch(err){
            throw new Error(err.message);
        }
    },

    getUserByUsername: async(username1)=>{
        try{
            const user=await UserAuth.findOne({
                where:{
                    username: username1
                }
            });
            return user;
        }catch(err){
            throw new Error(err.message);
        }
    },

    updatePassword: async(id1, newPassword)=>{
        try{
            const user=await UserAuth.update({
                password: newPassword
            },{
                where:{
                    id: id1
                }
            });
            return user;
        }catch(err){
            throw new Error(err);
        }
    },

    deleteUser: async(id1)=>{
        try{
            const user= await UserAuth.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    },

    validatePass: async(id1, password1)=>{
        try{
            const user=await UserAuth.findOne({
                where:{
                    id:id1,
                    password:password1
                }
            })
            return user
        }catch(err){
            throw new Error(err);
        }
    },
    sendEmail: async(email1)=>{
        var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'keepintouchsupp@gmail.com',
        pass: 'keepintouch32'
      }
    }));
    
    var mailOptions = {
      from: 'keepintouchsupp@gmail.com',
      to: email1,
      subject: 'Password reset',
      html: 'Hi!<br> You recently requested to reset your password for your Keep in Touch account. Click the following link in order to reset it. <br> http://localhost:8081/#/resetpassword/'+email1+'<br>Thank you for the patience!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
    }   
}

module.exports=userAuth;