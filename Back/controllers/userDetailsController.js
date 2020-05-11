const UserDetailsService=require("../services/userDetailsService");

const createDetails = async(req,res, next)=>{
    const user=req.body;
    try{
        await UserDetailsService.create(user)
        res.status(201).send({
            message: "User Details successfully added!"
        });
    }
    catch{
        res.status(400).send({
            message: "Phone or email already exist"
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

const getDetailsByAuthUsername=async(req, res)=>{
    const username=req.params.username;
    if(username){
        const user=await UserDetailsService.getDetailsByAuthUsername(username);
        res.status(200).send(user);
    }
};

const updateDetails=async(req,res)=>{
    const user=req.body;
    const id=req.params.id;
    if(id){
        try{
        await UserDetailsService.updateDetails(id, user.firstName, user.lastName, user.email, user.phone, user.facebook, user.profile,user.job,user.company,user.group,user.series,user.specialisation,user.promotion);
        res.status(200).send({
            message: "User Details updated!"
        });
    }catch(error){
        res.status(401).send({
            message: "Email or phone already exist!"
        });
    }
    }
};

module.exports={
    createDetails,
    getDetails,
    updateDetails,
    getDetailsByAuthId,
    getDetailsByAuthUsername
}