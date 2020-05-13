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
                    idUser: id1
                }
            });
            return image;
        } catch(err){
            throw new Error(err.message);
        }
    },
    updateImage: async(photo1, id1)=>{
        try{
            const image=await Image.update({
                photo: photo1,
            },{
                where:{
                    idUser: id1
                }
            });
            return image;
        }catch(err){
            throw new Error(err);
        }
    },
}

module.exports=image;