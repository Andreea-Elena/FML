const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const MeetingImage  = require('../models/meetingImage')(sequelize, Sequelize.DataTypes);

const image={
    create: async(image)=>{
        try {
            const result = await MeetingImage.create(image);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getAll: async(id)=>{
        try{
            const images=await MeetingImage.findAll({
                where:{
                    idMeeting: id,
                }
            });
            return images
        }catch(err){
            throw new Error(err);
        }
    },

    updateImage: async(photo1, id1)=>{
        try{
            const image=await MeetingImage.update({
                photo: photo1
            },{
                where:{
                    id: id1,
                }
            });
            return image;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports=image;