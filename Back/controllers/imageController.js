const ImageService = require("../services/imageService");

const createImage = async (req, res, next) => {
  try {
    if(req.files){
        const file=req.files.image
        const id=req.body.idUser

        ImageService.updateImageProfile(id)
        ImageService.create({
          idUser: id
        }).then(async response=>{
          file.mv(
            "../Front/src/statics/users/picture-"+id+"-"+response.id+".jpg",
            function(err){
                if(err){
                    res.status(403).send({error:err.message})
                }else if(file.mimetype==="image/jpeg"){
                    ImageService.updateImage(
                        '..\\statics\\users\\picture-'+id+"-"+response.id+'.jpg',
                        response.id
                    )
                    res.status(201).send({message:"succes"})
                }
                else{
                    res.status(401).send({message:"Incorrect format"})
                }
            }
        );          
        })
    }else{
        res.status(403).send({message:"Files not transmitted"})
    }
} catch(err) {
  res.status(400).send({error:err.message});
}
};

const getImageProfile = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const image = await ImageService.getImageByIdProfile(id);
    res.status(200).send(image);
  }
};

module.exports = {
  createImage,
  getImageProfile,
};
