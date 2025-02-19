const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const PostComment = require('../models/postComment')(sequelize, Sequelize.DataTypes);

const comment={
    create: async(comment)=>{
        try {
            const result = await PostComment.create(comment);
            return result;    
        } catch(err) {
           throw new Error(err.message); 
        }
    },


    updateComment: async(id1, newContent, newTitle)=>{
        try{
            const post=await PostComment.update({
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

    deleteComment: async(id1)=>{
        try{
            const user= await PostComment.destroy({
                where:{
                    id: id1
                }
            })
        }catch(err){
            throw new Error(err);
        }
    },

    getAll: async(id)=>{
        try{
            const comments=await PostComment.findAll({
                where:{
                    idPost: id,
                }
            });
            return comments
        }catch(err){
            throw new Error(err);
        }
    },
}

module.exports=comment;