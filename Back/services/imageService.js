const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const Image  = require('../models/Image')(sequelize, Sequelize.DataTypes);

const image={
    create: async(image)=>{
        try {
            const result = await Image.create(image);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getImageById: async(id1)=>{
        try{
            const image= await Image.findOne({
                where:{
                    id: id1
                }
            });
            return image;
        } catch(err){
            throw new Error(err.message);
        }
    },

    updateImage: async(id1,photo1)=>{
        try{
            const image=await Image.update({
                photo: photo1,
            },{
                where:{
                    id: id1
                }
            });
            return image;
        }catch(err){
            throw new Error(err);
        }
    },

    deleteImage: async(id1)=>{
        try{
            const user= await Image.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports=image;