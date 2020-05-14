module.exports = (sequelize, DataTypes) => {
    return sequelize.define("profileImage", {      
        photo: DataTypes.STRING,
        idUser: DataTypes.INTEGER,
        profile: DataTypes.BOOLEAN
    });
};