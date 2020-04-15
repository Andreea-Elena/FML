const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const Post  = require('../models/Post')(sequelize, Sequelize.DataTypes);

const post={
    create: async(post)=>{
        try {
            const result = await Post.create(post);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },

    getPostById: async(id1)=>{
        try{
            const post= await Post.findOne({
                where:{
                    id: id1
                }
            });
            return post;
        } catch(err){
            throw new Error(err.message);
        }
    },


    updatePost: async(id1, newContent, newTitle)=>{
        try{
            const post=await Post.update({
                content: newContent,
                title: newTitle
            },{
                where:{
                    id: id1
                }
            });
            return post;
        }catch(err){
            throw new Error(err);
        }
    },

    deletePost: async(id1)=>{
        try{
            const user= await Post.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports=post;