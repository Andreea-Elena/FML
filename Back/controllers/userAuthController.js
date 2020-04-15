const UserAuthService=require("../services/userAuthService");
const Joi = require('joi');

const createUser = async(req,res, next)=>{
    const user=req.body;
    const schema ={
        username: Joi.string().regex(
            new RegExp('^[[a-zA-Z0-9]{5,32}$')
        ),
        password: Joi.string().regex(
            new RegExp('^[[a-zA-Z0-9]{8,32}$')
        )
    };     

    const {error, value} = Joi.validate(req.body, schema)

    if(error){
        switch(error.details[0].context.key){
            case 'username':
                res.status(400).send({
                    message: "You must provide a valid username"
                });
                break
            case 'password':
                res.status(400).send({
                    message: `"The password provided failed to match the following: 
                    <br> 1. It must be at least 8 characters and max 32 characters
                    <br> 2. It must ONLY contain the following: lower case, upper case, numerics"`     
                });
                break
            default:
                res.status(400).send({
                    message: "Invalid registration information"
                });
                break
        }
    }
    else{
        try{
            const result = await UserAuthService.create(user);
            res.status(201).send({
                message: "User successfully created!"
            });
        }catch(err){
            res.status(400).send({
                message: "User already in use!"
            })
        }
    }
};

const getUser= async(req,res)=>{
    const id=req.params.id;
    if(id){
        const user=await UserAuthService.getUserById(id);
        res.status(200).send(user);
    }
}

const getUser1=async(req, res)=>{
    const id=req.params.id;
    if(id){
        const user=await UserAuthService.getUserByUsername(id);
        res.status(200).send(user);
    }
};

const changePassword=async(req,res)=>{
    const user=req.body;
    const id=req.params.id;
    if(id){
        const result=await UserAuthService.updatePassword(id, user.password);
        res.status(200).send({
            message: "User password changed!"
        });
    }
};

const deleteUser=async(req, res)=>{
    const id= req.params.id;
    if(id){
        const result=await UserAuthService.deleteUser(id);
        res.status(200).send({
            message: "User deleted succesfully!"
        })
    }
}

module.exports={
    createUser,
    getUser, 
    getUser1, 
    changePassword,
    deleteUser
}