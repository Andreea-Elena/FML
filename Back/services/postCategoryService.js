const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const PostCategory = require('../models/postCategory')(sequelize, Sequelize.DataTypes);

const category={
    create: async(category)=>{
        try {
            const result = await PostCategory.create(category);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getAll: async(id1)=>{
        try{
            const category= await PostCategory.findAll({
                where:{
                    idPost: id1
                }
            });
            return category;
        } catch(err){
            throw new Error(err.message);
        }
    },

    deleteCategory: async(id1)=>{
        try{
            const category= await PostCategory.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports=category;