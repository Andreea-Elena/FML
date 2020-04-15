const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const PostCategoryService=require("../services/postCategoryService");

const createCategory = async(req,res, next)=>{
    const category=req.body;
        await PostCategoryService.create(category);
        res.status(201).send({
            message: "Category successfully added!"
        });
};

const getCategories=async(req,res)=>{
    const id=req.params.id;
    if(id){
        const category=await PostCategoryService.getAll(id);
        res.status(200).send(category);
    }
}

const deleteCat=async(req, res)=>{
    const id= req.params.id;
    if(id){
        const result=await PostCategoryService.deleteCategory(id);
        res.status(200).send({
            message: "Category deleted succesfully!"
        })
    }
}

module.exports={
    createCategory,
    getCategories, 
    deleteCat
}