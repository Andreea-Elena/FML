module.exports = (sequelize, DataTypes) => {
    return sequelize.define("postImage", {      
        photo: {type: DataTypes.STRING,
            allowNull: false},
        idPost: DataTypes.INTEGER,
    });
};