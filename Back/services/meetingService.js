const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const Meeting  = require('../models/Meeting')(sequelize, Sequelize.DataTypes);

const meeting={
    create: async(meeting)=>{
        try {
            const result = await Meeting.create(meeting);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getMeetingById: async(id1)=>{
        try{
            const post= await Meeting.findOne({
                where:{
                    id: id1
                }
            });
            return post;
        } catch(err){
            throw new Error(err.message);
        }
    },

    deleteMeeting: async(id1)=>{
        try{
            const user= await Meeting.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    },

    getAll: async()=>{
        try{
            const users=await Meeting.findAll();
            return users
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports=meeting;