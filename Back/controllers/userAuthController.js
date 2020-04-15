const UserAuthService=require("../services/userAuthService");

const createUser = async(req,res, next)=>{
    const user=req.body;
    if(user.username && user.password){
        const result = await UserAuthService.create(user);
        res.status(201).send({
            message: "User successfully created!"
        });
    }
    else{
        res.status(400).send({
            message: "Invalid user!"
        });
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