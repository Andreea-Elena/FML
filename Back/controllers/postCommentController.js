const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const PostCommentService=require("../services/postCommentService");

const createComment = async(req,res, next)=>{
    console.log(req.body)
    const comment=req.body;
    if(comment.title && comment.content){
        await PostCommentService.create(comment);
        res.status(201).send({
            message: "Comment successfully added!"
        });
    }
    else{
        res.status(400).send({
            message: "Invalid comment!"
        });
    }
};


const updateComment=async(req,res)=>{
    const comment=req.body;
    const id=req.params.id;
    if(id){
        const result=await PostCommentService.updateComment(id, comment.content, comment.title);
        res.status(200).send({
            message: "Comment updated!"
        });
    }
}

const deleteComment=async(req, res)=>{
    const id= req.params.id;
    if(id){
        const result=await PostCommentService.deleteComment(id);
        res.status(200).send({
            message: "Comment deleted succesfully!"
        })
    }
}

const getPostComments = async (req, res) => {
    const id = req.params.id;
    if (id) {
      const result = await PostCommentService.getAll(id);
      res.status(200).send(result);
    }
  };

module.exports={
    createComment,
    updateComment, 
    deleteComment,
    getPostComments
}