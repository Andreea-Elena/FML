const UserAuthService=require("../services/userAuthService");
const jwt=require('jsonwebtoken');

const createUser = async(req,res, next)=>{
    const user=req.body;
        try{
            const result = await UserAuthService.create(user);
            res.status(201).send({
                message: "User successfully created!"
            });
            return result
        }catch(err){
            res.status(400).send({
                message: "User already in use!"
            })
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
    const username=req.params.username;
    if(username){
        try{
        const user=await UserAuthService.getUserByUsername(username);
        if(user)
        jwt.sign({user}, 'accesstoken',(err,accesstoken)=>{
            res.status(200).send({
                id: user.id,
                username: user.username,
                password: user.password,
                access_token: accesstoken
            });
        })
    }catch(err){
        res.status(401).send(err);
    }
    }
};

const changePassword=async(req,res)=>{
    const user=req.body;
    const id=req.params.id;
    if(user.password){
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
const validatePass=async(req, res)=>{
    const id= req.params.id;
    const password=req.params.password;
    if(id){
        const result=await UserAuthService.validatePass(id, password);
        if(result!=null)
        res.status(200).send({
            message: "Valid password!"
        })
        else{
            res.status(200).send({
                message: "Not a valid password!"
            })
        }
    }
}

    


module.exports={
    createUser,
    getUser, 
    getUser1, 
    changePassword,
    deleteUser,
    validatePass
}