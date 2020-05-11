module.exports = (sequelize, DataTypes) => {
    return sequelize.define("image", {      
        photo: DataTypes.STRING,
        idUser: DataTypes.INTEGER,
        idMeeting: DataTypes.INTEGER,
    });
};