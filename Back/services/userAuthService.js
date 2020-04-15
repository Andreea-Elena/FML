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
            throw new Error(err);
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
    }
}

module.exports=userAuth;