const ImageService = require("../services/imageService");

const createImage = async (req, res, next) => {
  try {
      if(req.files){
          const file=req.files.image
          const id=req.body.idUser

          file.mv(
              "../Front/src/assets/users/picture-"+id+".jpg",
              function(err){
                  if(err){
                      res.status(403).send({error:err.message})
                  }else if(file.mimetype==="image/jpeg"){
                      ImageService.create({
                          photo:"users/profile-"+id+".jpg",
                          idUser: id
                      })
                      res.status(201).send({message:"succes"})
                  }
                  else{
                      res.status(401).send({message:"Incorrect format"})
                  }
              }
          );          
      }else{
          res.status(403).send({message:"Files not transmitted"})
      }
  } catch(err) {
    res.status(400).send({error:err.message});
  }
};

const getImage = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const image = await ImageService.getImageById(id);
    res.status(200).send(image);
  }
};

module.exports = {
  createImage,
  getImage,
};
