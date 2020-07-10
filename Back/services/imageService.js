const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const Image  = require('../models/profileImage')(sequelize, Sequelize.DataTypes);

const image={
    create: async(image)=>{
        try {
            const result = await Image.create(image);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getImageByIdProfile: async(id1)=>{
        try{
            const image= await Image.findOne({
                where:{
                    idUser: id1,
                    profile: 1
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
                profile: 1
            },{
                where:{
                    id: id1,
                }
            });
            return image;
        }catch(err){
            throw new Error(err);
        }
    },
    updateImageProfile: async(id1)=>{

            const image=await Image.update({
                profile: 0,
            },{
                where:{
                    idUser: id1
                }
            });
            return image;
    },

    
    getImages: async()=>{
        try{
            const images= await Image.findAll();
            return images;
        } catch(err){
            throw new Error(err.message);
        }
    },
}

module.exports=image;