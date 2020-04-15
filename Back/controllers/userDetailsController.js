const UserDetailsService=require("../services/userDetailsService");

const createDetails = async(req,res, next)=>{
    const user=req.body;
    if(user.FirstName && user.LastName){
        await UserDetailsService.create(user);
        res.status(201).send({
            message: "User Details successfully added!"
        });
    }
    else{
        res.status(400).send({
            message: "Invalid user details!"
        });
    }
};

const getDetails=async(req,res)=>{
    const id=req.params.id;
    if(id){
        const user=await UserDetailsService.getDetails(id);
        res.status(200).send(user);
    }
};

const getDetailsByAuthId=async(req, res)=>{
    const id=req.params.id;
    if(id){
        const user=await UserDetailsService.getDetailsByAuthId(id);
        res.status(200).send(user);
    }
};

const updateDetails=async(req,res)=>{
    const user=req.body;
    const id=req.params.id;
    if(id){
        const result=await UserDetailsService.updateDetails(id, user.FirstName, user.LastName, user.email, user.phone, user.facebook, user.photo);
        res.status(200).send({
            message: "User Details updated!"
        });
    }
};

module.exports={
    createDetails,
    getDetails,
    updateDetails,
    getDetailsByAuthId
}