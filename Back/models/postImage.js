module.exports = (sequelize, DataTypes) => {
    return sequelize.define("postImage", {      
        photo: DataTypes.STRING,
        idPost: DataTypes.INTEGER,
    });
};