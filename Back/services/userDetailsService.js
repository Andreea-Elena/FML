const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const UserDetails  = require('../models/userDetails')(sequelize, Sequelize.DataTypes);

const userAuth={
    create: async(user)=>{
        try {
            const result = await UserDetails.create(user);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getDetails: async(id1)=>{
        try{
            const user= await UserDetails.findOne({
                where:{
                    id: id1
                }
            });
            return user;
        } catch(err){
            throw new Error(err.message);
        }
    },

    getDetailsByAuthId: async(id)=>{
        try{
            const user=await UserDetails.findOne({
                where:{
                    idUserAuth: id
                }
            });
            return user;
        }catch(err){
            throw new Error(err);
        }
    },


    updateDetails: async(id1, firstName, lastName,email1,phone1,facebook1,photo1)=>{
        try{
            const user=await UserDetails.update({
                FirstName: firstName,
                LastName: lastName,
                email: email1,
                phone: phone1,
                facebook: facebook1,
                photo: photo1
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

}

module.exports=userAuth;