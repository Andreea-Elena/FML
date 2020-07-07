const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const ImageService = require("../services/meetingImageService");

const createMeetingImage = async (req, res, next) => {
  try {
    if (req.files) {
      const file = req.files.image;
      const id = req.body.idMeeting;

      ImageService.updateImage(id);
      ImageService.create({
        idMeeting: id,
      }).then(async (response) => {
        file.mv(
          "../Front/src/statics/meetings/picture-" +
            id +
            "-" +
            response.id +
            ".jpg",
          function (err) {
            if (err) {
              res.status(403).send({ error: err.message });
            } else if (file.mimetype === "image/jpeg") {
              ImageService.updateImage(
                "..\\statics\\meetings\\picture-" +
                  id +
                  "-" +
                  response.id +
                  ".jpg",
                response.id
              )
              res.status(201).send({ message: "Succes" });
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

const getMeetingImages = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await ImageService.getAll(id);
    res.status(200).send(result);
  }
};

module.exports = {
  createMeetingImage,
  getMeetingImages,
};
