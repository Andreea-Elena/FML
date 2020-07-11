const ImageService = require("../services/postImageService");

const createPostImage = async (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.image;
      const id = req.body.idPost;

      ImageService.create({
        idPost: id,
      }).then(async (response) => {
        file.mv(
          "../Front/src/statics/posts/picture-" +
            id +
            "-" +
            response.id +
            ".jpg",
          function (err) {
            if (err) {
              res.status(403).send({ error: err.message });
            } else if (file.mimetype === "image/jpeg") {
              ImageService.updateImage(
                "..\\statics\\posts\\picture-" +
                  id +
                  "-" +
                  response.id +
                  ".jpg",
                response.id
              );
              res.status(201).send({ message: "succes" });
            } else {
              res.status(401).send({ message: "Incorrect format" });
            }
          }
        );
      });
    } else {
      res.status(403).send({ message: "Files not transmitted" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getPostImage = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const image = await ImageService.getImageByIdPost(id);
    res.status(200).send(image);
  }
};

const getImagesPost = async (req, res) => {
  const images = await ImageService.getImages();
  res.status(200).send(images);
};

module.exports = {
  createPostImage,
  getPostImage,
  getImagesPost,
};
