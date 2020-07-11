module.exports = (sequelize, DataTypes) => {
  return sequelize.define("postImage", {
    photo: { type: DataTypes.STRING },
    idPost: DataTypes.INTEGER,
  });
};
